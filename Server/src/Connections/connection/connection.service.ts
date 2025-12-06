import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AcceptSyncConnectionDTO, SyncRequest } from './dto/Connections.dto';

@Injectable()
export class ConnectionService {
  constructor(private readonly databaseService: DatabaseService) {}

  async SyncUserToAnother(SyncBody : SyncRequest){
    const pool = this.databaseService.getPool();
    const now = new Date();

    try {
        const result = await pool.query(
          `
            INSERT INTO connections (
              "type",
              "senderId",
              "receiverId",
              "projectId",
              "status",
              "message",
              "seen",
              "respondedAt",
              "createdAt",
              "updatedAt"
            ) VALUES (
              $1,$2,$3,$4,$5,$6,$7,$8,$9,$10
            ) RETURNING *
          `,
          [
            'sync',
            SyncBody.senderId,
            SyncBody.receiverId,
            null,
            'pending',
            SyncBody.message,
            false,
            null,
            now,
            now
          ]
        );
        if(result.rowCount === 0 ) throw new BadRequestException(`There is an Error in Syncing With ${SyncBody.receiverId}`)
        const Message = `${SyncBody.SenderUserName} is looking to sync with you!`
        const id = result.rows[0].id
        const action = {
          type : "sync",
          HTML : "button",
          actionName: "accept",
          payload : { ConnectionID : id }
        }
        const Notif = await this.databaseService.query(
          `INSERT INTO notifications 
          ("sender", "receiver", "type", "is_none_reply", "is_seen", "create_at", "update_at", "message", "replay", "actions")
          VALUES ($1, $2, 'Normal', true, false, NOW(), NOW(), $3, '' , $4)`,
          [SyncBody.senderId ,SyncBody.receiverId , Message , action ]
        );
        return {status : 200 , message :`Your connection request to ${SyncBody.ReciverUserName} has been sent`} ;
    }catch (err) {
      if (err.code === '23505') {
        throw new BadRequestException('This Connection Already Exists!');
      }
      throw err;
    }
  }

  async AcceptSyncUserToAnother(AcceptSyncBody : {ConnectionID : number , NotifId : number}){
    const pool = this.databaseService.getPool();
    const HandleConnectionStatus = await pool.query(
      `
        UPDATE connections SET "status"='accepted', "seen" = true WHERE id=$1 
      `
      ,[AcceptSyncBody.ConnectionID]
    )
    const NewNotifMessage = `You are now connected!`
    const NotificationActionHandler = await pool.query(
      `UPDATE notifications 
      SET "actions" = '{}' , message = $2
      WHERE "notif_id" = $1;
      ` , [AcceptSyncBody.NotifId , NewNotifMessage]
    )
    if(HandleConnectionStatus.rowCount === 0 && NotificationActionHandler.rowCount === 0) throw new BadRequestException("There is no such Connection!")
    return {status : 200 , message : "Sync Accepted!"}
    
  }
} 
