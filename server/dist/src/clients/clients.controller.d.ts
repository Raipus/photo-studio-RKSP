import { Client } from "./client.entity";
import { ClientsService } from "./clients.service";
import { CreateClientDto } from "./dto/create-client.dto";
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    findAll(): Promise<Client[]>;
    findOne(id: string): Promise<Client>;
    update(id: string, updateClient: Client): Promise<Client>;
    create(createClient: CreateClientDto): Promise<Client>;
    remove(id: string): import("@nestjs/common").HttpStatus;
}
