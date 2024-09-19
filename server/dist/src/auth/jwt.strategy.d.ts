import { Strategy } from 'passport-jwt';
import { IUser } from 'src/types/types';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(user: IUser): Promise<{
        id: string;
        email: string;
    }>;
}
export {};