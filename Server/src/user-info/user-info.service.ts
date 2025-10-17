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

    if (userCheck.rowCount === 0) {
      throw new BadRequestException(
        `User with id ${createUserInfoDto.userid} does not exist`,
      );
    }

    const query = `
        INSERT INTO userInfo ("userid", "phone", "age", "bio", "social", "skills", "learning_skills", "resume", "favorite", "createdAt", "updatedAt")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
        RETURNING *;
      `;
    const values = [
      createUserInfoDto.userid,
      createUserInfoDto.phone,
      createUserInfoDto.age,
      createUserInfoDto.bio,
      JSON.stringify(createUserInfoDto.social),
      JSON.stringify(createUserInfoDto.skills),
      JSON.stringify(createUserInfoDto.learning_skills),
      JSON.stringify(createUserInfoDto.resume),
      JSON.stringify(createUserInfoDto.favorite),
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
      `SELECT phone, dateofbirth, bio, social, skills, learning_skills, resume, favorite FROM userInfo WHERE userid = $1`,
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

    // همیشه updatedAt رو آپدیت کن
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
}
