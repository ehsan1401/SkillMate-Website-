import { BadRequestException, Get, Injectable } from '@nestjs/common';
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
        `SELECT "id", "userName", "email", "type", "profileImageUrl" FROM users WHERE id = $1`,
        [id]
      );

      usersInfo.push({
        ...user.rows[0],
        ...userINFO.rows[0],
      });
    }

    return usersInfo;
  }

async DeletefavoriteUsers(UserId: number, DeleteUserID: number) {
    const pool = this.databaseService.getPool();

    const result = await pool.query(
      'SELECT favorite FROM userinfo WHERE userid = $1',
      [UserId]
    );

    if (result.rows.length === 0) {
      throw new BadRequestException(
        `User Not founded!`,
      );
    }

    let favorite = result.rows[0].favorite;

    if (typeof favorite === 'string') {
      favorite = JSON.parse(favorite);
    }

    if (favorite.People && Array.isArray(favorite.People)) {
      favorite.People = favorite.People.filter(
        (id: number) => id !== DeleteUserID
      );
    }

    if (favorite.People.length === 0) {
      delete favorite.People;
    }

    await pool.query('UPDATE userinfo SET favorite = $1 WHERE userid = $2', [
      JSON.stringify(favorite),
      UserId,
    ]);

    return {
      message: 'Favorite user removed successfully',
      updatedFavorite: favorite,
    };
  }

}

