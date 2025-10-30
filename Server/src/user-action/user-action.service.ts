import { Get, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class UserActionService {
  constructor(private readonly databaseService: DatabaseService) {}

  async favoriteUsers(usersId: Array<number>) {
    const pool = this.databaseService.getPool();
    const usersInfo: Array<object> = [];

    for (const id of usersId) {
      const userINFO = await pool.query(
        `SELECT "phone", "dateofbirth", "bio", "social", "skills", "learning_skills" FROM userinfo WHERE userid = $1`,
        [id]
      );

      const user = await pool.query(
        `SELECT "userName", "email", "type", "profileImageUrl" FROM users WHERE id = $1`,
        [id]
      );

      usersInfo.push({
        ...user.rows[0],
        ...userINFO.rows[0],
      });
    }

    return usersInfo;
  }

}
