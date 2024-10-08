import { HttpStatus } from "@nestjs/common";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { IncompleteUserDto } from "./dto/incomplete-user.dto";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
import { Photo } from "src/photos/photo.entity";
import { Booking } from "src/bookings/booking.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtService } from "@nestjs/jwt";
export declare class UsersService {
    private readonly userRepository;
    private readonly photographerRepository;
    private readonly studioRepository;
    private readonly photoRepository;
    private readonly bookingRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, photographerRepository: Repository<Photographer>, studioRepository: Repository<Studio>, photoRepository: Repository<Photo>, bookingRepository: Repository<Booking>, jwtService: JwtService);
    create(userDto: CreateUserDto): Promise<{
        newUser: User;
        token: string;
    }>;
    findOne(email: string): Promise<User>;
    findAll(): Promise<User[]>;
    findIncomplete(): Promise<IncompleteUserDto[]>;
    update(id: number, updatedUser: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<HttpStatus>;
}
