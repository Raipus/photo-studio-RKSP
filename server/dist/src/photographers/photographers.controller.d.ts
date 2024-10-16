import { CreatePhotographerDto } from './dto/create-photographer.dto';
import { PhotographersService } from './photographers.service';
export declare class PhotographersController {
    private readonly PhotographersService;
    constructor(PhotographersService: PhotographersService);
    findAll(): Promise<import("./photographer.entity").Photographer[]>;
    findOne(email: string): Promise<import("./photographer.entity").Photographer>;
    update(id: string, updatePhotographer: CreatePhotographerDto): Promise<import("./photographer.entity").Photographer>;
    create(createPhotographer: CreatePhotographerDto): Promise<import("./photographer.entity").Photographer>;
    remove(id: string): Promise<import("@nestjs/common").HttpStatus>;
}
