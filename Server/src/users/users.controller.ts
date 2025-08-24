import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from './dto/CreateUser.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import type { Request as ExpressRequest } from 'express';


interface JwtUserPayload {
  userName: string;
  email: string;
  type: string;
  profileImageUrl: string;
  biography: string;
  lastLogin: Date;
  createAt: Date;
  updateAt: Date;
}


@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}


    @Post()
    create(@Body() createUserDto: CreateUser) {
      return this.usersService.create(createUserDto);
    }


    @Get('protected')
    @UseGuards(JwtAuthGuard)
    getProtected(@Request() req:ExpressRequest) {

    const user = req.user as JwtUserPayload; 
      return {
        userName: user.userName,
        email: user.email,
        type: user.type,
        profileImageUrl: user.profileImageUrl,
        biography: user.biography,
        lastLogin: user.lastLogin,
        createAt: user.createAt,
        updateAt: user.updateAt,
      };
    }


}
