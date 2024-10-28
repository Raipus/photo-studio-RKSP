import { BookingsService } from './booking.service';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Request } from 'express';
export declare class BookingsController {
    private readonly BookingsService;
    constructor(BookingsService: BookingsService);
    check(studioId: number, date: string): Promise<{
        available: boolean;
    }>;
    findAll(req: Request): Promise<Booking[]>;
    findOne(id: number): Promise<Booking>;
    update(id: number, updateBooking: CreateBookingDto): Promise<Booking>;
    create(createBooking: CreateBookingDto): Promise<Booking>;
    remove(id: number): Promise<import("@nestjs/common").HttpStatus>;
}
