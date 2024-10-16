import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { BookingsService } from "src/bookings/booking.service";
import { PhotographersService } from "src/photographers/photographers.service";
//import { PhotosService } from "src/photos/photo.service";
import { StudiosService } from "src/studios/studios.service";
import { UsersService } from "src/users/user.service";

@Injectable()
export class AuthorGuard implements CanActivate {
    constructor(
        private readonly bookingService: BookingsService,
//        private readonly photosService: PhotosService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const path = request.url.split('/');
        const id = request.params;

        let entity

        if (path.includes('bookings')) {
            entity = await this.bookingService.findOne(id);
        }

//        if (path.includes('photos')) {
//            entity = await this.photosService.findOne(id);
//        }

        const user = request.user;

        if (entity && user && entity.user.id == user.id) {
            return true
        }

        throw new BadRequestException('Something went wrong...')
    }
}