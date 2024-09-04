import { CanActivate, ExecutionContext } from "@nestjs/common";
export declare class AuthorGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
