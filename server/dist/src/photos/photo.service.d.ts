import { HttpStatus } from "@nestjs/common";
import { Repository } from "typeorm";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
import { User } from "src/users/user.entity";
import { Photo } from "./photo.entity";
import { CreatePhotoDto } from "./dto/create-photo.dto";
import { UpdatePhotoDto } from "./dto/update-photo.dto";
export declare class PhotosService {
    private readonly userRepository;
    private readonly photographerRepository;
    private readonly studioRepository;
    private readonly photoRepository;
    constructor(userRepository: Repository<User>, photographerRepository: Repository<Photographer>, studioRepository: Repository<Studio>, photoRepository: Repository<Photo>);
    create(photoDto: CreatePhotoDto): Promise<Photo>;
    findOne(id: number): Promise<Photo>;
    findAll(): Promise<Photo[]>;
    update(id: number, updatedPhoto: UpdatePhotoDto): Promise<Photo>;
    remove(id: number): Promise<HttpStatus>;
}
