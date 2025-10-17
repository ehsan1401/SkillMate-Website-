import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';

@Controller('user-info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Post('create-UserInfo')
  create(@Body() createUserDto: CreateUserInfoDto) {
    return this.userInfoService.create(createUserDto);
  }

  @Get(':id')
  GetInfo(@Param('id') id: string) {
    return this.userInfoService.GetInfo(Number(id));
  }

  @Get('userInfoExist/:id')
  InfoExist(@Param('id') id: string) {
    return this.userInfoService.InfoExist(Number(id));
  }

  @Patch('InfoUpdate/:id')
  update(
    @Param('id', ParseIntPipe) userid: number,
    @Body() updateDto: UpdateUserInfoDto,
  ) {
    return this.userInfoService.update(userid, updateDto);
  }
}
