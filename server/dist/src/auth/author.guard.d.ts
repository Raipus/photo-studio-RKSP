import { CanActivate, ExecutionContext } from "@nestjs/common";
import { BookingsService } from "src/bookings/booking.service";
export declare class AuthorGuard implements CanActivate {
    private readonly bookingService;
    constructor(bookingService: BookingsService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
