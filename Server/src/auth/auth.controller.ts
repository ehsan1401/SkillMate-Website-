import { Controller, Post, Body, Res, Get, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response , Request } from 'express';
import { JwtService } from '@nestjs/jwt';

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
    console.log(payload)

    return {access_token: this.jwtService.sign(payload)};
  }

  @Post('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return new Promise((resolve, reject) => {
      req.session.destroy(err => {
        if (err) {
          console.error('Logout error:', err);
          reject({ ok: false, message: 'Logout failed' });
        } else {
          res.clearCookie('connect.sid');
          resolve({ ok: true, message: 'Logged out successfully' });
        }
      });
    });
  }

}
