import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUser } from './dto/CreateUser.dto';
import { unlink } from 'fs';
import { join } from 'path';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUser) {
    const pool = this.databaseService.getPool();

    const query = `
      INSERT INTO users ("userName", "email", "passCode", "type", "profileImageUrl", "lastLogin", "createAt", "updateAt")
      VALUES ($1, $2, $3, 'NORMAL', '', NOW(), NOW(), NOW())
      RETURNING *;
    `;
    const values = [
      createUserDto.userName,
      createUserDto.email,
      createUserDto.passCode,
    ];
    const result = await pool.query(query, values);

    return result.rows[0];
  }

  async updateAvatar(email: string, filename: string) {
    const pool = this.databaseService.getPool();

    const userResult = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
    );
    const user = userResult.rows[0];
    if (!user) throw new Error('User not found');

    if (user.profileImageUrl) {
      const oldPath = join(process.cwd(), user.profileImageUrl);
      unlink(oldPath, (err) => {
        if (err) console.error('Failed to delete old avatar:', err);
      });
    }

    const updateResult = await pool.query(
      `UPDATE users SET "profileImageUrl" = $1, "updateAt" = NOW() WHERE email = $2 RETURNING *`,
      [`/uploads/avatars/${filename}`, email],
    );

    return updateResult.rows[0];
  }

  async findByEmail(email: string) {
    const pool = this.databaseService.getPool();
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    return result.rows[0];
  }
}
