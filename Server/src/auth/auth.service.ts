import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly databaseService: DatabaseService
  ) {}

  async validateUser(email: string, passCode: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new UnauthorizedException('Email is not Valid!');


    const user = await this.databaseService.user.findUnique({
      where: { email },
    });

    if (!user) throw new UnauthorizedException('User not found');

    if (user.passCode !== passCode) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }

  async login(user: any) {
  const payload = {
    userName: user.userName,
    email: user.email,
    type: user.type,
    profileImageUrl: user.profileImageUrl,
    biography: user.biography,
    lastLogin: user.lastLogin,
    createAt: user.createAt,
    updateAt: user.updateAt,
  };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


  async verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
