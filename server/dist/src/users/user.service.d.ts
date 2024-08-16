import { HttpStatus } from "@nestjs/common";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { IncompleteUserDto } from "./dto/incomplete-user.dto";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
export declare class UsersService {
    private readonly userRepository;
    private readonly photographerRepository;
    private readonly studioRepository;
    constructor(userRepository: Repository<User>, photographerRepository: Repository<Photographer>, studioRepository: Repository<Studio>);
    create(userDto: CreateUserDto): Promise<User>;
    findOne(id: number): Promise<User>;
    findAll(): Promise<User[]>;
    findIncomplete(): Promise<IncompleteUserDto[]>;
    update(id: number, updatedUser: User): Promise<User>;
    remove(id: number): Promise<HttpStatus>;
}
