import { HttpStatus } from '@nestjs/common';
import { Studio } from './studio.entity';
import { Repository } from 'typeorm';
import { CreateStudioDto } from './dto/create-studio.dto';
import { Booking } from 'src/bookings/booking.entity';
export declare class StudiosService {
    private readonly bookingRepository;
    private readonly studioRepository;
    constructor(bookingRepository: Repository<Booking>, studioRepository: Repository<Studio>);
    create(studioNew: CreateStudioDto): Promise<Studio>;
    findOne(id: number): Promise<Studio>;
    findAll(): Promise<Studio[]>;
    update(id: number, updatedStudio: CreateStudioDto): Promise<Studio>;
    remove(id: number): Promise<HttpStatus>;
}
