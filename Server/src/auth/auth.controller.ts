import {
  Controller,
  Post,
  Body,
  Res,
  Req,
  UnauthorizedException,
  HttpStatus,
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
    const { access_token } = await this.authService.login(user);
    const { refresh_token } = await this.authService.refreshToken(user);



  console.log('ACCESS TOKEN PAYLOAD:', this.jwtService.decode(access_token));

    response.cookie('access_token', access_token, {
      domain: 'myapp.test',
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      // maxAge: 1000 * 60 * 60,
      maxAge: 1000 * 5 * 5,

    });

    response.cookie('refresh_token', refresh_token, {
      domain: 'myapp.test',
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { message: 'Login successful' };
  }

  @Post('Logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const Refreshtoken = req.cookies['refresh_token'];
    if (Refreshtoken) {
      await this.authService.DeleteRefreshToken(Refreshtoken)
    }

    res.clearCookie('access_token', { path: '/', domain: 'myapp.test' });
    res.clearCookie('refresh_token', { path: '/', domain: 'myapp.test' });

    return { message: 'Logout successful' };
  }

  
@Post('refresh-token')
async refreshToken(@Req() req: Request, @Res() res: Response) {
  const token = req.cookies['refresh_token'];
  if (!token) return res.sendStatus(HttpStatus.UNAUTHORIZED);

  try {
    const payload = await this.authService.verifyRefreshToken(token);
    if(!payload.email) {
      res.status(HttpStatus.NO_CONTENT).json({ message: 'Payload is not correct!!!' })
    }
    const user = await this.authService.GetUserWithEmail(payload.email);
    const { access_token } = await this.authService.login(user);
    res.cookie('access_token', access_token, {
      domain: 'myapp.test',
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 1000,
    });
    res.cookie('refresh_token', token, {
      domain: 'myapp.test',
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(HttpStatus.OK).json({ message: 'Access token refreshed' });
  } catch {
    res.sendStatus(HttpStatus.FORBIDDEN);
  }
}

  
}
