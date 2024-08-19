import { PhotosService } from "./photo.service";
import { Photo } from "./photo.entity";
import { CreatePhotoDto } from "./dto/create-photo.dto";
export declare class PhotosController {
    private readonly PhotosService;
    constructor(PhotosService: PhotosService);
    findAll(): Promise<Photo[]>;
    findOne(id: number): Promise<Photo>;
    update(id: number, updatePhoto: Photo): Promise<Photo>;
    create(createPhoto: CreatePhotoDto): Promise<Photo>;
    remove(id: number): Promise<import("@nestjs/common").HttpStatus>;
}
