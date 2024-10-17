import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

type JwtPayload = {
  sub: number;
  email: string;
  role: string;
};

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy,'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}