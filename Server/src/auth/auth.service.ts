import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
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

    const result = await this.databaseService.query(
      'SELECT * FROM users WHERE email = $1 LIMIT 1',
      [email],
    );
    const user = result.rows[0];

    if (!user) throw new UnauthorizedException('User not found');
    if (user.passCode !== passCode) throw new UnauthorizedException('Invalid password');
    
    return user;
  }

  async login(user: any) {
    const payload = {
      userName: user.userName, // دقت کن به نام ستون‌ها
      email: user.email,
      type: user.type,
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

  async SignUp(userName: string, email: string, passCode: string, RepassCode: string) {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) throw new BadRequestException('Email is not valid!');

    // بررسی وجود یوزر
    const existing = await this.databaseService.query(
      'SELECT * FROM users WHERE email = $1 LIMIT 1',
      [email],
    );
    if (existing.rows.length > 0) throw new ConflictException('User already exists!');

    if (passCode !== RepassCode) throw new BadRequestException('Password and repeat password do not match!');
    if (!strongPasswordRegex.test(passCode)) {
      throw new BadRequestException(
        'Password is too weak! It must contain at least 8 characters, including uppercase, lowercase, number, and special character.'
      );
    }


    const result = await this.databaseService.query(
      `INSERT INTO users ("userName", "email", "passCode", "type", "profileImageUrl", "lastLogin", "createAt", "updateAt")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        userName,
        email,
        passCode,
        'NORMAL',
        '',
        new Date(),
        new Date(),
        new Date(),
      ],
    );
    const newUser = result.rows[0];

    const payload = {
      userName: newUser.userName,
      email: newUser.email,
      type: newUser.type,
      profileImageUrl: newUser.profileImageUrl,
      lastLogin: newUser.lastLogin,
      createAt: newUser.createAt,
      updateAt: newUser.updateAt,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
