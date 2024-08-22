import { BookingsService } from "./booking.service";
import { Booking } from "./booking.entity";
import { CreateBookingDto } from "./dto/create-booking.dto";
export declare class BookingsController {
    private readonly BookingsService;
    constructor(BookingsService: BookingsService);
    findAll(): Promise<Booking[]>;
    findOne(id: number): Promise<Booking>;
    update(id: number, updateBooking: CreateBookingDto): Promise<Booking>;
    create(createBooking: CreateBookingDto): Promise<Booking>;
    remove(id: number): Promise<import("@nestjs/common").HttpStatus>;
}
