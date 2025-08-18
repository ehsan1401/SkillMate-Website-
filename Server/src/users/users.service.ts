import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as jwt from 'jsonwebtoken';
import { CreateUser } from './dto/CreateUser.dto';



@Injectable()
export class UsersService {
    constructor( private readonly databaseService : DatabaseService){}

    async SignIn(createUserDto: CreateUser) {
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
}
