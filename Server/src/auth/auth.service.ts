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


    const user = await this.databaseService.user.findUnique({
      where: { email },
    });

    if (!user) throw new UnauthorizedException('User not found');

    if (user.passCode !== passCode) {
      throw new UnauthorizedException('Invalid password')
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
      throw new UnauthorizedException('Invalid token')
    }
  }

  async SignUp(userName: string, email: string, passCode: string, RepassCode: string) {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailRegex.test(email)) throw new BadRequestException('Email is not valid!');


    const user = await this.databaseService.user.findUnique({ where: { email } });
    if (user) throw new ConflictException('User already exists!');


    if (passCode !== RepassCode) throw new BadRequestException('Password and repeat password do not match!');

 
    if (!strongPasswordRegex.test(passCode)) {
      throw new BadRequestException(
        'Password is too weak! It must contain at least 8 characters, including uppercase, lowercase, number, and special character.'
      );
    }

    const newUser = await this.databaseService.user.create({
      data: {
        userName,
        email,
        passCode,
        type: 'NORMAL',
        profileImageUrl: '',
        biography: '',
        lastLogin: new Date(),
        createAt: new Date(),
        updateAt: new Date(),
        userToken: ''
      },
    });

    const payload = {
      userName: newUser.userName,
      email: newUser.email,
      type: newUser.type,
      profileImageUrl: newUser.profileImageUrl,
      biography: newUser.biography,
      lastLogin: newUser.lastLogin,
      createAt: newUser.createAt,
      updateAt: newUser.updateAt,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
