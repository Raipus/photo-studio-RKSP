import { HttpStatus } from "@nestjs/common";
import { Studio } from "./studio.entity";
import { Repository } from "typeorm";
import { User } from "src/users/user.entity";
import { CreateStudioDto } from "./dto/create-studio.dto";
export declare class StudiosService {
    private readonly userRepository;
    private readonly studioRepository;
    constructor(userRepository: Repository<User>, studioRepository: Repository<Studio>);
    create(studioNew: CreateStudioDto): Promise<Studio>;
    findOne(id: number): Promise<Studio>;
    findAll(): Promise<Studio[]>;
    update(id: number, updatedStudio: Studio): Promise<Studio>;
    remove(id: number): Promise<HttpStatus>;
}
