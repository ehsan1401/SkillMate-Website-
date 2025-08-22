// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `${process.env.JWT_SECRET}`,
    });
  }

  async validate(payload: any) {
    return {
      userName: payload.userName,
      email: payload.email,
      type: payload.type,
      profileImageUrl: payload.profileImageUrl,
      biography: payload.biography,
      lastLogin: payload.lastLogin,
      createAt: payload.createAt,
      updateAt: payload.updateAt,
    };
  }
}
