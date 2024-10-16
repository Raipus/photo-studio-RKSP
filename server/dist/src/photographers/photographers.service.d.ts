import { HttpStatus } from '@nestjs/common';
import { Booking } from 'src/bookings/booking.entity';
import { Photo } from 'src/photos/photo.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreatePhotographerDto } from './dto/create-photographer.dto';
import { Photographer } from './photographer.entity';
export declare class PhotographersService {
    private readonly userRepository;
    private readonly photographerRepository;
    private readonly photoRepository;
    private readonly bookingRepository;
    constructor(userRepository: Repository<User>, photographerRepository: Repository<Photographer>, photoRepository: Repository<Photo>, bookingRepository: Repository<Booking>);
    create(photographerNew: CreatePhotographerDto): Promise<Photographer>;
    findOne(email: string): Promise<Photographer>;
    findAll(): Promise<Photographer[]>;
    update(id: number, updatedPhotographer: CreatePhotographerDto): Promise<Photographer>;
    remove(id: number): Promise<HttpStatus>;
}
