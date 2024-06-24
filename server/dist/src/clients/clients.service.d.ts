import { HttpStatus } from "@nestjs/common";
import { Client } from "./client.entity";
import { Repository } from "typeorm";
import { CreateClientDto } from "./dto/create-client.dto";
import { IncompleteClientDto } from "./dto/incomplete-client.dto";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
export declare class ClientsService {
    private readonly clientRepository;
    private readonly photographerRepository;
    private readonly studioRepository;
    constructor(clientRepository: Repository<Client>, photographerRepository: Repository<Photographer>, studioRepository: Repository<Studio>);
    create(clientDto: CreateClientDto): Promise<Client>;
    findOne(id: number): Promise<Client>;
    findAll(): Promise<Client[]>;
    findIncomplete(): Promise<IncompleteClientDto[]>;
    update(id: number, updatedClient: Client): Promise<Client>;
    remove(id: number): HttpStatus;
}
