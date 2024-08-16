import { HttpStatus } from "@nestjs/common";
import { Photographer } from "./photographer.entity";
import { Repository } from "typeorm";
import { User } from "src/users/user.entity";
import { CreatePhotographerDto } from "./dto/create-photographer.dto";
export declare class PhotographersService {
    private readonly clientRepository;
    private readonly photographerRepository;
    constructor(clientRepository: Repository<User>, photographerRepository: Repository<Photographer>);
    create(photographerNew: CreatePhotographerDto): Promise<Photographer>;
    findOne(id: number): Promise<Photographer>;
    findAll(): Promise<Photographer[]>;
    update(id: number, updatedPhotographer: Photographer): Promise<Photographer>;
    remove(id: number): Promise<HttpStatus>;
}
