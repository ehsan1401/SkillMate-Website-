import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as jwt from 'jsonwebtoken';
import { CreateUser } from './dto/CreateUser.dto';



@Injectable()
export class UsersService {
    constructor( private readonly databaseService : DatabaseService){}

    async create(createUserDto: CreateUser) {



      return this.databaseService.user.create({
        data: {
          ...createUserDto,
          type: 'NORMAL',
          profileImageUrl: '',
          biography: '',
          userToken: '',
          lastLogin: new Date(),
        },
      });
    }

    async login(email: string, passCode: string) {


      const user = await this.databaseService.user.findUnique({
        where: { email },
      });

      if (!user) {
        return { success: false, message: 'User not found' };
      }

      if (user.passCode !== passCode) {
        return { success: false, message: 'Incorrect password' };
      }
            const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error('JWT_SECRET is not defined in .env');

      const payload = { email : email}
      const token = jwt.sign(payload, secret, { expiresIn: '1h' });
      await this.databaseService.user.update({
        where : {email},
        data : {
          userToken : token
        }
      })

      return { success: true, message: 'Login successful' , token };
    }
}
