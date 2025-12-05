import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';

@Injectable()
export class UserInfoService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserInfoDto: CreateUserInfoDto) {
    const pool = this.databaseService.getPool();

    const userCheck = await pool.query(`SELECT id FROM users WHERE id = $1`, [
      createUserInfoDto.userid,
    ]);

    const CheckInfoExist = await pool.query(`SELECT id FROM userinfo WHERE userid = $1`, [
      createUserInfoDto.userid,
    ]);
    if ((CheckInfoExist.rowCount ?? 0) > 0) {
      throw new BadRequestException(
        `User info already exist!`,
      );
    }

    if (userCheck.rowCount === 0) {
      throw new BadRequestException(
        `User with id ${createUserInfoDto.userid} does not exist`,
      );
    }

    const query = `
      INSERT INTO userInfo (
        "userid",
        "phone",
        "dateofbirth",
        "bio",
        "social",
        "skills",
        "learning_skills",
        "resume",
        "favorite",
        "createdAt",
        "updatedAt",
        "headerImage",
        "Location",
        "jobTitle",
        "Education",
        "workExperience"
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9,
        NOW(), NOW(),
        $10, $11, $12, $13, $14
      )
      RETURNING *;
    `;

    const values = [
      createUserInfoDto.userid,
      createUserInfoDto.phone,
      createUserInfoDto.dateofbirth,
      createUserInfoDto.bio,
      JSON.stringify(createUserInfoDto.social),
      JSON.stringify(createUserInfoDto.skills),
      JSON.stringify(createUserInfoDto.learning_skills),
      JSON.stringify(createUserInfoDto.resume),
      JSON.stringify({
        "People": [],
        "Projects": []
      }),
      JSON.stringify({
        "headerImageURL": "",
        "headerImageALT": "",
        "Position": "",
        "overlayOpacity": "",
        "overlayColor": "",
      }),
      JSON.stringify({
        "country":"",
        "City": "",
      }),
      JSON.stringify(createUserInfoDto.jobTitle),
      JSON.stringify([]),
      JSON.stringify([])
    ];


    const result = await pool.query(query, values);

    return result.rows[0];
  }

  async InfoExist(userID: number) {
    if (isNaN(userID)) {
      throw new BadRequestException(`Invalid user ID: ${userID}`);
    }

    const pool = this.databaseService.getPool();
    const userCheck = await pool.query(
      `SELECT id FROM userInfo WHERE userid = $1`,
      [userID],
    );

    if (userCheck.rowCount === 0) {
      return false;
    }
    return true;

  }


  async GetInfo(userID: number) {
    const pool = this.databaseService.getPool();
    const exists = await this.InfoExist(userID);
    if (!exists) {
      throw new BadRequestException(
        `UserInfo with id ${userID} does not exist`,
      );
    }
    const result = await pool.query(
      `SELECT 
      "phone", 
      "dateofbirth", 
      "bio", 
      "social", 
      "skills", 
      "learning_skills", 
      "resume", 
      "favorite" ,
      "headerImage", "Location" ,"jobTitle" , "Education", "workExperience"
      FROM userInfo WHERE userid = $1`,
      [userID],
    );

    return result.rows[0];
  }

  async update(userID: number, updateDto: Partial<UpdateUserInfoDto>) {
    const pool = this.databaseService.getPool();
    const exists = await this.InfoExist(userID);
    if (!exists)
      throw new BadRequestException(
        `UserInfo with id ${userID} does not exist`,
      );

    const fields: string[] = [];
    const values: any[] = [];
    let index = 1;

    for (const key of Object.keys(updateDto)) {
      let value: any = updateDto[key as keyof UpdateUserInfoDto];
      if (value !== undefined) {
        if (
          [
            'social',
            'skills',
            'learning_skills',
            'resume',
            'favorite',
          ].includes(key)
        ) {
          value = JSON.stringify(value);
        }
        fields.push(`"${key.toLowerCase()}" = $${index++}`);
        values.push(value);
      }
    }

    fields.push(`"updatedAt" = NOW()`);

    const query = `
        UPDATE userInfo
        SET ${fields.join(', ')}
        WHERE "userid" = $${index}
        RETURNING *;
      `;
    values.push(userID);

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async updateUserInfo(userId : number , updateDto : UpdateUserInfoDto){
    const pool = this.databaseService.getPool()

    const userCheck = await pool.query(`SELECT id FROM users WHERE id = $1`, [
      userId,
    ]);
    if (userCheck.rowCount === 0) {
      throw new BadRequestException(
        `User with id ${userId} does not exist`,
      );
    }
    const exists = await this.InfoExist(userId);
    if (!exists) {
      const query = `
        INSERT INTO userInfo (
          "userid",
          "phone",
          "dateofbirth",
          "bio",
          "social",
          "skills",
          "learning_skills",
          "resume",
          "favorite",
          "createdAt",
          "updatedAt",
          "headerImage",
          "Location",
          "jobTitle",
          "Education",
          "workExperience"
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9,
          NOW(), NOW(),
          $10, $11, $12, $13, $14
        )
        RETURNING *;
      `;

      const values = [
        userId,
        updateDto.phone,
        updateDto.dateofbirth,
        updateDto.bio,
        JSON.stringify(updateDto.social),
        JSON.stringify(updateDto.skills),
        JSON.stringify(updateDto.learning_skills),
        JSON.stringify(updateDto.resume),
        JSON.stringify(updateDto.favorite),
        JSON.stringify(updateDto.headerImage),
        JSON.stringify(updateDto.Location),
        JSON.stringify(updateDto.jobTitle),
        JSON.stringify(updateDto.Education),
        JSON.stringify(updateDto.workExperience)
      ];
    const result = await pool.query(query, values);
    if(result.rowCount === 0 ) return {status : 500 , message : "Internal Server Error!!"}
    return {status : 200 , message : "User Info Successfuly Created!"}

    }
    else {
      const fields: string[] = [];
      const values: any[] = [];
      let index = 1;

      const jsonFields = [
        "social",
        "skills",
        "learning_skills",
        "resume",
        "favorite",
        "headerImage",
        "Location",
        "jobTitle",
        "Education",
        "workExperience"
      ];

      for (const key of Object.keys(updateDto)) {
        let value: any = updateDto[key as keyof UpdateUserInfoDto];
        if (value !== undefined) {
          // فقط فیلدهای JSON stringify شوند
          if (jsonFields.includes(key)) {
            value = JSON.stringify(value);
          }
          fields.push(`"${key}" = $${index++}`);
          values.push(value);
        }
      }
      fields.push(`"updatedAt" = NOW()`);

      const query = `
        UPDATE userInfo
        SET ${fields.join(', ')}
        WHERE "userid" = $${index}
        RETURNING *;
      `;
      values.push(userId);
      const result = await pool.query(query, values);
      if (result.rowCount === 0) {
        return { status: 500, message: "Internal Server Error!!" };
      }

      return { status: 200, message: "User Info Successfully Updated!" };
    }

    
  }
}
