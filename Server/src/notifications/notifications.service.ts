import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { NewNotificationsTypes } from './dto/type';


@Injectable()
export class NotificationsService {
    constructor(private readonly databaseService : DatabaseService){}

    async Allnotifications(id : number , filter? : NewNotificationsTypes){
        const pool = this.databaseService.getPool();
        const checkUserExist = await pool.query(`SELECT * FROM users WHERE id=$1` , [id])
        if(checkUserExist.rowCount === 0 ) throw new BadRequestException('User dose not exist!')
        let Option : string  = ``;

        switch(filter){
            case "Super" :
                Option = `AND notifications.type = 'Super' `
                break;
            case "System":
                Option = `AND notifications.type = 'System' `
                break;
            case "Seen":
                Option = `AND notifications.is_seen = false `
                break;
            default :
                Option = ``
                break;
        }

        const query = `SELECT notifications.type ,
        notifications.is_none_reply,
        notifications.notif_id,
        notifications.is_seen,
        notifications.message,
        notifications.update_at,
        notifications.create_at,
        notifications.actions,
        users."userName",
        users."profileImageUrl",
        users."id" AS "UserID"
        FROM notifications INNER JOIN users ON notifications.sender = users.id
        WHERE notifications.receiver = $1 ${filter ? Option : ``}
        ORDER BY notifications.is_seen ASC, notifications.create_at DESC`

        const Notifications = await pool.query(
            query , [id]
        )

        return Notifications.rows
    }

    async ChangeSeenStatus(NotifId : number){
        const pool = this.databaseService.getPool();
        const checkNotifExist = await pool.query(`SELECT * FROM notifications WHERE notif_id=$1` , [NotifId])
        if(checkNotifExist.rowCount === 0 ) throw new BadRequestException('This Notification Dosent Exist!')
        const Result = await pool.query(`UPDATE notifications SET is_seen = true WHERE notif_id=$1` , [NotifId])
        if(Result.rowCount !== 0) return {status: 200 , message : "notification has Read!"}
        return {status : 500 , message : "there is an Error!"}
    }

    async NumberOfNotifications(userID: number) {
        const pool = this.databaseService.getPool();
        const checkUserExist = await pool.query(
            `SELECT id FROM users WHERE id = $1`,
            [userID]
        );
        if (checkUserExist.rowCount === 0) {
            throw new BadRequestException("User does not exist!");
        }
        const result = await pool.query(`
            SELECT 
                COUNT(*) FILTER (WHERE type = 'Super'  AND is_seen = false) AS "Super",
                COUNT(*) FILTER (WHERE type = 'System' AND is_seen = false) AS "System",
                COUNT(*) FILTER (WHERE is_seen = false)                   AS "Seen"
            FROM notifications
            WHERE receiver = $1
        `, [userID]);

        const row = result.rows[0];
        return {
            Super: Number(row.Super),
            System: Number(row.System),
            Seen: Number(row.Seen),
            All: Number(row.Seen)
        };
    }

    async DeleteNotifications(NotifId : number){
        const pool = this.databaseService.getPool();
        const checkNotifExist = await pool.query(`SELECT * FROM notifications WHERE notif_id=$1` , [NotifId])
        if(checkNotifExist.rowCount === 0 ) throw new BadRequestException('This Notification Dosent Exist!')
        const Result = await pool.query(`DELETE FROM notifications WHERE notif_id=$1` , [NotifId])
        if(Result.rowCount === 0 ) throw new BadRequestException("There is Some Error on Deleting Notification")
        return {status : 200  , message : "Notification Deleted!"};
    }
}
