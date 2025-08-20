import { Controller, Post, Body, Res, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response , Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { email: string; passCode: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateUser(
      body.email,
      body.passCode,
    );

    const { access_token } = await this.authService.login(user);

    res.cookie('token', access_token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      secure: false,
      path: '/', 
      maxAge: 1000 * 60 * 60 * 24,
    });

    return { token : access_token }
  }


  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      httpOnly: true, 
      // secure: process.env.NODE_ENV === 'production',
      secure : false ,
      sameSite: 'lax',
    });
    return { message: 'Logged out successfully' };
  }


  @Get('status')
  async status(@Req() req: Request) {
    const token = req.cookies?.token;
    if (!token) return { loggedIn: false };

    try {
      const payload = await this.authService.verifyToken(token);
      return { loggedIn: true, payload };
    } catch {
      return { loggedIn: false };
    }
  }

}
