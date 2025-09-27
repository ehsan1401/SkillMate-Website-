import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserInfoDto } from './dto/create-user-info.dto';


@Injectable()
export class UserInfoService {
  constructor(private readonly databaseService: DatabaseService) {}

    async create(createUserInfoDto: CreateUserInfoDto) {
      const pool = this.databaseService.getPool();

      const userCheck = await pool.query(
        `SELECT id FROM users WHERE id = $1`,
        [createUserInfoDto.userid]
      );

      if (userCheck.rowCount === 0) {
        throw new BadRequestException(`User with id ${createUserInfoDto.userid} does not exist`);
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
        JSON.stringify(createUserInfoDto.favorite)
      ];
      const result = await pool.query(query, values);
  
      return result.rows[0];
    }
}
