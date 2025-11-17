import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class NotificationsService {
    constructor(private readonly databaseService : DatabaseService){}

    async Allnotifications(id : number){
        const pool = this.databaseService.getPool();
        // const Notifications = []
        const checkUserExist = await pool.query(`SELECT * FROM users WHERE id=$1` , [id])
        if(checkUserExist.rowCount === 0 ) throw new BadRequestException('User dose not exist!')

        const Notifications = await pool.query(
            `SELECT notifications.type ,
            notifications.is_none_reply,
            notifications.is_removed,
            notifications.is_seen,
            notifications.message,
            notifications.update_at,
            notifications.create_at,
            users."userName",
            users."profileImageUrl",
            users."id" AS "UserID"
            FROM notifications INNER JOIN users ON notifications.sender = users.id
            WHERE 
            notifications.receiver = $1` , [id])

        return Notifications.rows
        
        
        // const User = await pool.query(`SELECT * FROM notifications WHERE receiver=$1` , [id])
        // return{Data : User.rows}
    }

    async ChangeSeenStatus(NotifId : number){
        const pool = this.databaseService.getPool();
        const checkNotifExist = await pool.query(`SELECT * FROM notifications WHERE notif_id=$1` , [NotifId])
        if(checkNotifExist.rowCount === 0 ) throw new BadRequestException('This Notification Dosent Exist!')

        const Result = await pool.query(`UPDATE notifications SET is_seen = true WHERE notif_id=$1` , [NotifId])
        if(Result.rowCount !== 0) return {status: 200 , message : "notification has Read!"}
        return {status : 500 , message : "there is an Error!"}
    }
}
