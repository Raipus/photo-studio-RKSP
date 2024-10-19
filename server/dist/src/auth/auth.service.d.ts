import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/auth.dto';
import { PhotographersService } from 'src/photographers/photographers.service';
export declare class AuthService {
    private usersService;
    private photographerService;
    private jwtService;
    private configService;
    constructor(usersService: UsersService, photographerService: PhotographersService, jwtService: JwtService, configService: ConfigService);
    signUp(createUserDto: CreateUserDto): Promise<any>;
    signIn(data: AuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: number, role: string): Promise<import("../photographers/photographer.entity").Photographer | import("../users/user.entity").User>;
    getUserInfo(email: string, role: string): Promise<import("../photographers/photographer.entity").Photographer | import("../users/user.entity").User>;
    hashData(data: string): Promise<string>;
    updateRefreshToken(userId: number, refreshToken: string, role: string): Promise<void>;
    getTokens(userId: number, email: string, role: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshTokens(userEmail: string, role: string, refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
