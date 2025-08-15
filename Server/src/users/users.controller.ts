import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { LoginDto } from './dto/Login.dto';
import { CreateUser } from './dto/CreateUser.dto';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}


    @Post()
    create(@Body() createUserDto: CreateUser) {
    return this.usersService.create(createUserDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const { email, passCode } = loginDto;
        return this.usersService.login(email, passCode);
    }


}
