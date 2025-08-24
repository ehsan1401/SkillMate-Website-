import { Controller, Post, Body, Res, Get, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response , Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/SignUp.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}


  @Post('login')
  async login(
    @Body() body: { email: string; passCode: string },
    @Req() req: Request,
  ) {
    const user = await this.authService.validateUser(
      body.email,
      body.passCode,
    );
    const payload = user;

    return {access_token: this.jwtService.sign(payload)};
  }


  @Post('SignUp')
  async SignUp(@Body() body: SignUpDto) {
    return this.authService.SignUp(
      body.userName,
      body.email,
      body.passCode,
      body.RepassCode,
    );
}



}
