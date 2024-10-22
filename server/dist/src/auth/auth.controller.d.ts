import { Request } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(createUserDto: CreateUserDto): Promise<any>;
    signin(data: AuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(req: Request): void;
    refreshTokens(req: Request): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getUserInfo(req: Request): Promise<import("../photographers/photographer.entity").Photographer | import("../users/user.entity").User>;
}
