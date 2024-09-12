import { CanActivate, ExecutionContext } from "@nestjs/common";
import { BookingsService } from "src/bookings/booking.service";
import { PhotosService } from "src/photos/photo.service";
export declare class AuthorGuard implements CanActivate {
    private readonly bookingService;
    private readonly photosService;
    constructor(bookingService: BookingsService, photosService: PhotosService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
