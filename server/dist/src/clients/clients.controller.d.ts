import { Client } from "./client.entity";
import { ClientsService } from "./clients.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { IncompleteClientDto } from "./dto/incomplete-client.dto";
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    findIncomplete(): Promise<IncompleteClientDto[]>;
    findAll(): Promise<Client[]>;
    findOne(id: number): Promise<Client>;
    update(id: number, updateClient: Client): Promise<Client>;
    create(createClient: CreateClientDto): Promise<Client>;
    remove(id: number): import("@nestjs/common").HttpStatus;
}
