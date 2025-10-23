import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response, Request, response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/SignUp.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  // @Post('login')
  // async login(
  //   @Body() body: { email: string; passCode: string },
  //   @Req() req: Request,
  // ) {
  //   const user = await this.authService.validateUser(body.email, body.passCode);
  //   const payload = user;

  //   return { access_token: this.jwtService.sign(payload) };
  // }

  @Post('SignUp')
  async SignUp(@Body() body: SignUpDto) {
    return this.authService.SignUp(
      body.userName,
      body.email,
      body.passCode,
      body.RepassCode,
    );
  }


  @Post('login')
  async login(
    @Body() body: { email: string; passCode: string },
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request
  ) {
    const user = await this.authService.validateUser(body.email, body.passCode);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = user;

    const token = this.jwtService.sign(payload);
    console.log("TOKEN CREATED : " , token)
    response.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60,
    });
    return { message: 'Login successful' };
  }


@Get('set-cookie')
setCookie(@Res({ passthrough: true }) response: Response) {
  const data = {
    name: 'ehsan',
    age: '22',
    job: 'student',
  };

  response.cookie('Something', JSON.stringify(data), {
    // domain: 'myapp.test',
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    maxAge: 1000 * 60 * 60,
  });
  return { message: 'Cookie has been set!' };
}

  
  // @Get('SetCookie')
  // findAllC(@Res({ passthrough: true }) response: Response) {
  //   const data = {
  //     "name" : "ehsan",
  //     "age" : "22",
  //     "job" : "student"
  //   }
  //   response.cookie('Something', JSON.stringify(data))

  // }

  @Get("show")
  findAll(@Req() request: Request) {
    console.log(request.cookies);
  }
  
}
