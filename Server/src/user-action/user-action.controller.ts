import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserActionService } from './user-action.service';

@Controller('user-action')
export class UserActionController {
  constructor(private readonly userActionService: UserActionService) {}
  
  @Post('GetFavoriteUsers')
  findManyFavoriteUsers(@Body('UsersId') UsersId: number[]) {
    return this.userActionService.favoriteUsers(UsersId)
  }

}
