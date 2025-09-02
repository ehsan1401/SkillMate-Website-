import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as jwt from 'jsonwebtoken';
import { CreateUser } from './dto/CreateUser.dto';
import { unlink } from 'fs';
import { join } from 'path';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

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

  async updateAvatar(email: string, filename: string) {

    const user = await this.databaseService.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found');


    if (user.profileImageUrl) {
      const oldPath = join(__dirname, '..', '..', user.profileImageUrl);
      unlink(oldPath, (err) => {
        if (err) console.error('Failed to delete old avatar:', err);
      });
    }


    const updatedUser = await this.databaseService.user.update({
      where: { email },
      data: {
        profileImageUrl: `/uploads/avatars/${filename}`,
      },
    });

    return updatedUser;
  }

  async findByEmail(email: string) {
    return this.databaseService.user.findUnique({
      where: { email },
    });
  }
}
