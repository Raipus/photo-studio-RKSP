import { HttpStatus } from "@nestjs/common";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { IncompleteUserDto } from "./dto/incomplete-user.dto";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
import { Booking } from "src/bookings/booking.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UpdateTokenDto } from "./dto/update-token.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
export declare class UsersService {
    private readonly userRepository;
    private readonly photographerRepository;
    private readonly studioRepository;
    private readonly bookingRepository;
    constructor(userRepository: Repository<User>, photographerRepository: Repository<Photographer>, studioRepository: Repository<Studio>, bookingRepository: Repository<Booking>);
    create(userDto: CreateUserDto): Promise<User>;
    findOne(email: string): Promise<User>;
    findOneId(id: number): Promise<User>;
    findAll(): Promise<User[]>;
    findIncomplete(): Promise<IncompleteUserDto[]>;
    update(id: number, updatedUser: UpdateUserDto): Promise<User>;
    updateRole(id: number, updatedRole: UpdateRoleDto): Promise<User>;
    updateToken(id: number, updatedUser: UpdateTokenDto): Promise<User>;
    remove(id: number): Promise<HttpStatus>;
}
