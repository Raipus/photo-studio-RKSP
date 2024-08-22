import { CreateStudioDto } from "./dto/create-studio.dto";
import { Studio } from "./studio.entity";
import { StudiosService } from "./studios.service";
export declare class StudiosController {
    private readonly StudiosService;
    constructor(StudiosService: StudiosService);
    findAll(): Promise<Studio[]>;
    findOne(id: string): Promise<Studio>;
    update(id: string, updateStudio: CreateStudioDto): Promise<Studio>;
    create(createStudio: CreateStudioDto): Promise<Studio>;
    remove(id: string): Promise<import("@nestjs/common").HttpStatus>;
}
