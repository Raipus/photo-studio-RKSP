import { CreatePhotographerDto } from "./dto/create-photographer.dto";
import { Photographer } from "./photographer.entity";
import { PhotographersService } from "./photographers.service";
export declare class PhotographersController {
    private readonly PhotographersService;
    constructor(PhotographersService: PhotographersService);
    findAll(): Promise<Photographer[]>;
    findOne(id: string): Promise<Photographer>;
    update(id: string, updatePhotographer: Photographer): Promise<Photographer>;
    create(createPhotographer: CreatePhotographerDto): Promise<Photographer>;
    remove(id: string): Promise<import("@nestjs/common").HttpStatus>;
}
