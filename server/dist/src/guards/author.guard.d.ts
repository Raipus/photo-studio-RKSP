import { CanActivate, ExecutionContext } from "@nestjs/common";
import { BookingsService } from "src/bookings/booking.service";
import { UsersService } from "src/users/user.service";
export declare class AuthorGuard implements CanActivate {
    private readonly bookingService;
    private readonly userService;
    constructor(bookingService: BookingsService, userService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
