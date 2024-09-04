import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';
import { UsersService } from 'src/users/user.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: IUser): Promise<{
        access_token: string;
    }>;
}
