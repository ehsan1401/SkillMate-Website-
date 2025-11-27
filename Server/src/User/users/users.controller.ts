import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  NotFoundException,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from './dto/CreateUser.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import type { Request as ExpressRequest } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

interface JwtUserPayload {
  userName: string;
  email: string;
  type: string;
  profileImageUrl: string;
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

  @Post('upload-avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: ExpressRequest,
  ) {
    const user = req.user as JwtUserPayload;
    return this.usersService.updateAvatar(user.email, file.filename);
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  async getProtected(@Request() req: ExpressRequest) {
    const userJwt = req.user as { sub: number; email: string };
    const user = await this.usersService.findByEmail(userJwt.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      id: user.id,
      userName: user.userName,
      email: user.email,
      type: user.type,
      profileImageUrl: user.profileImageUrl,
      lastLogin: user.lastLogin,
      createAt: user.createAt,
      updateAt: user.updateAt,
      inspection : user.inspection,
      ShowInSearch : user.ShowInSearch
    };
  }


  @Patch('update-Username')
  updateUsername(@Body() body: { email: string , newUsername: string }) {
    return this.usersService.updateUsername(body);
  }

  @Patch('inspection/:id')
  AddOneInspection(
    @Param('id' , ParseIntPipe)  userId : number
  ){
    return this.usersService.AddOneInspection(userId)
  }

  @Patch('SearchShow/:id')
  ChangeSearchShow(
    @Param('id' , ParseIntPipe) userId : number ,
    @Body() body : {showInSearch : boolean}
  ){
    return this.usersService.ChangeSearchShow(userId , body.showInSearch)
  }

  @Get('UserProfileCompleted/:id')
  UserProfileCompleted(
    @Param('id' , ParseIntPipe ) userId : number
  ){
    return this.usersService.UserProfileCompleted(userId)
  }

}
