import { CreateStudioDto } from './dto/create-studio.dto';
import { StudiosService } from './studios.service';
export declare class StudiosController {
    private readonly StudiosService;
    constructor(StudiosService: StudiosService);
    findAll(): Promise<import("./studio.entity").Studio[]>;
    findOne(id: string): Promise<import("./studio.entity").Studio>;
    update(id: string, updateStudio: CreateStudioDto): Promise<import("./studio.entity").Studio>;
    create(createStudio: CreateStudioDto): Promise<import("./studio.entity").Studio>;
    remove(id: string): Promise<import("@nestjs/common").HttpStatus>;
}
