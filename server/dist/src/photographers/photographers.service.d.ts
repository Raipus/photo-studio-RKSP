import { HttpStatus } from "@nestjs/common";
import { Photographer } from "./photographer.entity";
import { Repository } from "typeorm";
import { Client } from "src/clients/client.entity";
export declare class PhotographersService {
    private readonly clientRepository;
    private readonly photographerRepository;
    constructor(clientRepository: Repository<Client>, photographerRepository: Repository<Photographer>);
    create(photographerNew: Photographer): Promise<Photographer>;
    findOne(id: number): Promise<Photographer>;
    findAll(): Promise<Photographer[]>;
    update(id: number, updatedPhotographer: Photographer): Promise<Photographer>;
    remove(id: number): Promise<HttpStatus>;
}
