import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { BookingsService } from "src/bookings/booking.service";
import { PhotographersService } from "src/photographers/photographers.service";
import { UsersService } from "src/users/user.service";
//import { PhotosService } from "src/photos/photo.service";

@Injectable()
export class AuthorGuard implements CanActivate {
    constructor(
        private readonly bookingService: BookingsService,
        private readonly userService: UsersService,
//        private readonly photosService: PhotosService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const path = request.url.split('/');
        const id = parseInt(request.params['id']);

        let entity
        var flag = ''

        if (path.includes('bookings')) {
            entity = await this.bookingService.findOne(id);
            flag = 'bookings';
        }

        if (path.includes('users')) {
            entity = await this.userService.findOneId(id);
            flag = 'users';
        }

//        if (path.includes('photos')) {
//            entity = await this.photosService.findOne(id);
//            flag = 'photos';
//        }

        const userId = request.user['sub'];
        const userRole = request.user['role'];

        if (userRole == 'admin') return true;

        if (flag == 'bookings') {
            if (entity && userId && entity.user.id == userId) {
                return true
            }
        } else if (flag == 'users') {
            if (entity && userId && entity.id == userId) {
                return true
            }
        }
        

        throw new UnauthorizedException('У Вас нет доступа к данному ресурсу!')
    }
}