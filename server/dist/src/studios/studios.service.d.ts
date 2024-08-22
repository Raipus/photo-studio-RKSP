import { HttpStatus } from "@nestjs/common";
import { Studio } from "./studio.entity";
import { Repository } from "typeorm";
import { CreateStudioDto } from "./dto/create-studio.dto";
import { Photo } from "src/photos/photo.entity";
import { Booking } from "src/bookings/booking.entity";
export declare class StudiosService {
    private readonly bookingRepository;
    private readonly studioRepository;
    private readonly photoRepository;
    constructor(bookingRepository: Repository<Booking>, studioRepository: Repository<Studio>, photoRepository: Repository<Photo>);
    create(studioNew: CreateStudioDto): Promise<Studio>;
    findOne(id: number): Promise<Studio>;
    findAll(): Promise<Studio[]>;
    update(id: number, updatedStudio: CreateStudioDto): Promise<Studio>;
    remove(id: number): Promise<HttpStatus>;
}
