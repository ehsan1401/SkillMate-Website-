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
      response.cookie('access_token', token, {
      domain: 'myapp.test',
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60,
    });
    return { message: 'Login successful' };
  }

  @Post('Logout')
  async Logout(
    @Res({passthrough : true}) response : Response 
  ){
    response.clearCookie('access_token' , {
      domain: 'myapp.test',
      path: '/',
    })
    return { message : "Logout Successful" }
  }
  
}
