import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { PhotographersService } from 'src/photographers/photographers.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private photographerService: PhotographersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const userExists = await this.usersService.findOne(createUserDto.email);
    if (userExists) {
      throw new BadRequestException(
        `Пользователь с почтой ${createUserDto.email} уже существует!`,
      );
    }

    const hash = await this.hashData(createUserDto.password);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hash,
    });
    const tokens = await this.getTokens(
      newUser.id,
      newUser.email,
      newUser.role,
    );
    await this.updateRefreshToken(
      newUser.id,
      tokens.refreshToken,
      newUser.role,
    );
    return tokens;
  }

  async signIn(data: AuthDto) {
    const user1 = await this.photographerService.findOne(data.email);
    if (user1) {
      const passwordMatches = await argon2.verify(
        user1.password,
        data.password,
      );
      if (!passwordMatches) throw new BadRequestException('Пароль неверный!');
      const tokens = await this.getTokens(user1.id, user1.email, user1.role);
      await this.updateRefreshToken(user1.id, tokens.refreshToken, user1.role);
      return tokens;
    } else {
      const user = await this.usersService.findOne(data.email);
      if (!user) {
        throw new BadRequestException(
          `Пользователя с почтой ${data.email} не существует!`,
        );
      }
      const passwordMatches = await argon2.verify(user.password, data.password);
      if (!passwordMatches) throw new BadRequestException('Пароль неверный!');
      const tokens = await this.getTokens(user.id, user.email, user.role);
      await this.updateRefreshToken(user.id, tokens.refreshToken, user.role);
      return tokens;
    }
  }

  async logout(userId: number, role: string) {
    if (role == 'user' || role == 'admin')
      return this.usersService.updateToken(userId, { refreshToken: null });
    else {
      return this.photographerService.updateToken(userId, {
        refreshToken: null,
      });
    }
  }

  async getUserInfo(email: string, role: string) {
    if (role == 'user' || role == 'admin')
      return this.usersService.findOne(email);
    else {
      return this.photographerService.findOne(email);
    }
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: number, refreshToken: string, role: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    if (role == 'user' || role == 'admin')
      await this.usersService.updateToken(userId, {
        refreshToken: hashedRefreshToken,
      });
    else {
      await this.photographerService.updateToken(userId, {
        refreshToken: hashedRefreshToken,
      });
    }
  }

  async getTokens(userId: number, email: string, role: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userEmail: string, role: string, refreshToken: string) {
    const user1 = await this.photographerService.findOne(userEmail);
    if (user1) {
      if (!user1 || !user1.refreshToken)
        throw new ForbiddenException('Access Denied');
      const refreshTokenMatches = await argon2.verify(
        user1.refreshToken,
        refreshToken,
      );
      if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
      const tokens = await this.getTokens(user1.id, user1.email, user1.role);
      await this.updateRefreshToken(user1.id, tokens.refreshToken, user1.role);
      return tokens;
    } else {
      const user = await this.usersService.findOne(userEmail);
      if (!user || !user.refreshToken)
        throw new ForbiddenException('Access Denied');
      const refreshTokenMatches = await argon2.verify(
        user.refreshToken,
        refreshToken,
      );
      if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
      const tokens = await this.getTokens(user.id, user.email, user.role);
      await this.updateRefreshToken(user.id, tokens.refreshToken, user.role);
      return tokens;
    }
  }
}
