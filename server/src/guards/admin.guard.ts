import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor() {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const userRole = request.user['role'];

        if (userRole == 'admin') return true;

        throw new UnauthorizedException('У Вас нет доступа к данному ресурсу!')
    }
}