import { CanActivate, ExecutionContext } from "@nestjs/common";

export class AuthorGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const path = request.url.split('/');

        //Работает
        if (path.includes('bookings')) {
            console.log('Bookings');
        }

        return true
    }
}