import { ClientsService } from "./clients.service";
export declare class IncompleteController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    findIncomplete(): Promise<import("./dto/incomplete-client.dto").IncompleteClientDto[]>;
}
