import { HttpStatus } from "@nestjs/common";
import { Studio } from "./studio.entity";
import { Repository } from "typeorm";
import { Client } from "src/clients/client.entity";
export declare class StudiosService {
    private readonly clientRepository;
    private readonly studioRepository;
    constructor(clientRepository: Repository<Client>, studioRepository: Repository<Studio>);
    create(studioNew: Studio): Promise<Studio>;
    findOne(id: number): Promise<Studio>;
    findAll(): Promise<Studio[]>;
    update(id: number, updatedStudio: Studio): Promise<Studio>;
    remove(id: number): Promise<HttpStatus>;
}
