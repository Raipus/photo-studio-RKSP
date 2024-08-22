import { HttpStatus } from "@nestjs/common";
import { Repository } from "typeorm";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
import { Booking } from "src/bookings/booking.entity";
import { User } from "src/users/user.entity";
import { CreateBookingDto } from "./dto/create-booking.dto";
export declare class BookingsService {
    private readonly userRepository;
    private readonly photographerRepository;
    private readonly studioRepository;
    private readonly bookingRepository;
    constructor(userRepository: Repository<User>, photographerRepository: Repository<Photographer>, studioRepository: Repository<Studio>, bookingRepository: Repository<Booking>);
    create(bookingDto: CreateBookingDto): Promise<Booking>;
    findOne(id: number): Promise<Booking>;
    findAll(): Promise<Booking[]>;
    update(id: number, updatedBooking: CreateBookingDto): Promise<Booking>;
    remove(id: number): Promise<HttpStatus>;
}
