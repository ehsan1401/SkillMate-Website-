import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from './dto/CreateUser.dto';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}


    @Post()
    create(@Body() createUserDto: CreateUser) {
      return this.usersService.create(createUserDto);
    }

}
