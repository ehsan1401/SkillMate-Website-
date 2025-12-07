import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUser } from './dto/CreateUser.dto';
import { unlink } from 'fs';
import { join } from 'path';
import { toUsernameSlug } from 'src/utils/toUsernameSlug';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUser) {
    const pool = this.databaseService.getPool();

    const query = `
      INSERT INTO users ("userName", "email", "passCode", "type", "profileImageUrl", "lastLogin", "createAt", "updateAt" , "Gender")
      VALUES ($1, $2, $3, 'NORMAL', '', NOW(), NOW(), NOW() , $4)
      RETURNING *;
    `;
    const values = [
      createUserDto.userName,
      createUserDto.email,
      createUserDto.passCode,
      createUserDto.Gender
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

    if(updateResult.rowCount === 0 ) return { status: 500, message: "Internal Server Error!" }

    return { status: 200, message: "User avatar successfully uploaded!" };
  }

  async findByEmail(email: string) {
    const pool = this.databaseService.getPool();
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    return result.rows[0];
  }

  async updateUsername(body: { email: string; newUsername: string }) {
    const pool = this.databaseService.getPool();
    const ConvertedUserName = toUsernameSlug(body.newUsername)

    const userCheck = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      body.email,
    ]);
    if (userCheck.rowCount === 0) {
      return {status : 401 , message : `User with email: ${body.email} does not exist`};
    }

    const UsernameRepeat = await pool.query(`SELECT id FROM users WHERE "userName" = $1`, [
      ConvertedUserName,
    ]);
    if (UsernameRepeat.rows.length > 0) {
      return {status : 401 , message : "This username has already been used!"};
    }

    const result = await pool.query(
      `UPDATE users
      SET "userName" = $1, "updateAt" = NOW()
      WHERE email = $2
      RETURNING *`,
      [ConvertedUserName, body.email]
    );

    return {status : 200 , message : "Username updated successfully!"};
  }

  async AddOneInspection(userId : number){
    const pool = this.databaseService.getPool();
    const CheckUser = await pool.query(`SELECT id FROM users WHERE id=$1` , [userId])
    if (CheckUser.rowCount === 0) {
      throw new BadRequestException(`User with id ${userId} dosent Exist!`);
    }
    const userVisit = await pool.query(
      `UPDATE users SET "inspection" = "inspection" + 1 , "updateAt" = "updateAt" WHERE id=$1` , [userId]
    )
    if(userVisit.rowCount === 0){
      throw new InternalServerErrorException(`There is an Error! Please Try again!`);
    }
  }

  async ChangeSearchShow( userId : number , showInSearch : boolean){
    const pool = this.databaseService.getPool();
    const CheckUser = await pool.query('SELECT id FROM users WHERE id=$1' , [userId])
    if(CheckUser.rowCount === 0){
      throw new BadRequestException(`User with id ${userId} dosent Exist!`);
    }
    const result = await pool.query(`UPDATE users SET "ShowInSearch"=$1 WHERE id=$2` , [ showInSearch , userId])
    if(result.rowCount === 0) throw new BadRequestException("Show status didnt update! try again!")
    return {message : 'Show status has Changed!'}
  }

  async UserProfileCompleted(userId : number){
    const pool = this.databaseService.getPool();
    const query = `
      SELECT 
      u."email",
      i."phone",
      i."bio",
      i."jobTitle",
      i."Education",
      i."workExperience",
      u."profileImageUrl",
      u."Gender",
      u."ShowInSearch",
      i."dateofbirth",
      i."social",
      i."skills",
      i."learning_skills",
      i."resume"
      FROM users u
      LEFT JOIN userinfo i ON u.id = i.userid
      WHERE u.id = $1
    `;

    const result = await pool.query(query, [userId]);
    const user = result.rows[0];


    const UserValues = Object.fromEntries(
      Object.entries(user).map(([key, value]) => {
        const isEmpty =
          value === null ||
          value === false ||
          value === "" ||
          (Array.isArray(value) && value.length === 0) ||
          (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0);

        return [key, !isEmpty];
      })
    );

    return(UserValues)
    
  }

  async SetUserGender(userId : number , Gender : "Male" | "Female" |"Other"){
    const pool = this.databaseService.getPool();
    const Result = await pool.query(`
      UPDATE users SET "Gender" = $1 , "updateAt" = NOW() WHERE id = $2
      ` , [Gender , userId])

  }
}

        
        
        
        