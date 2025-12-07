import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { toUsernameSlug } from 'src/utils/toUsernameSlug';


@Injectable()
export class PeoplesService {
    constructor(private readonly databaseService : DatabaseService){}
    

    async GetPeopleInformation(peopleUsername: string){
        const pool = this.databaseService.getPool();
        const CheckUserExist = await pool.query(`SELECT id FROM users WHERE "userName" = $1` , [peopleUsername])
        if(CheckUserExist.rowCount === 0 ) throw new BadRequestException('User Dosent Exist! ')


        const query = `
            SELECT 
                users."userName",
                users."Gender",
                users."type",
                users."profileImageUrl",
                users."createAt",
                users."ShowInSearch",
                userinfo."phone",
                userinfo."dateofbirth",
                userinfo."bio",
                userinfo."social",
                userinfo."skills",
                userinfo."learning_skills",
                userinfo."resume",
                userinfo."headerImage",
                userinfo."Location",
                userinfo."jobTitle",
                userinfo."Education",
                userinfo."workExperience",
                (userinfo.userid IS NOT NULL) AS has_userinfo
            FROM users
            LEFT JOIN userinfo ON userinfo.userid = users.id
            WHERE users."userName" = $1
        `;
        const Result = await pool.query(query , [peopleUsername])

        return Result.rows
    }
}

