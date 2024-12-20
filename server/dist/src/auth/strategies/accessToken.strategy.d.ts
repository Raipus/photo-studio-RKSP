import { Strategy } from 'passport-jwt';
type JwtPayload = {
    sub: number;
    email: string;
    role: string;
};
declare const AccessTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class AccessTokenStrategy extends AccessTokenStrategy_base {
    constructor();
    validate(payload: JwtPayload): JwtPayload;
}
export {};
