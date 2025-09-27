import { Controller, Post, Body} from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { CreateUserInfoDto } from './dto/create-user-info.dto';


@Controller('user-info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}


      @Post('create-UserInfo')
      create(@Body() createUserDto: CreateUserInfoDto) {
        return this.userInfoService.create(createUserDto);
      }
}
