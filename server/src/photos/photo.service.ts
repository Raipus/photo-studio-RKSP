import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
import { User } from "src/users/user.entity";
import { Photo } from "./photo.entity";
import { CreatePhotoDto } from "./dto/create-photo.dto";
import { UpdatePhotoDto } from "./dto/update-photo.dto";

@Injectable ()
export class PhotosService {
    constructor (
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Photographer)
        private readonly photographerRepository: Repository<Photographer>,
        @InjectRepository(Studio)
        private readonly studioRepository: Repository<Studio>,
        @InjectRepository(Photo)
        private readonly photoRepository: Repository<Photo>
    ) {}

    async create(photoDto: CreatePhotoDto): Promise<Photo> {
        const photo = this.photoRepository.create();

        photo.category = photoDto.category;
        photo.path = photoDto.path;

        await this.photoRepository.save(photo);
        return photo;
    }

    async findOne(id: number): Promise<Photo> {
        try{
            const photo = await this.photoRepository.findOne({ where: { id } });

            if (!photo) {
                throw new NotFoundException(`Фото с ID ${id} не найдено`);
            }
            
            return photo;
        }
        catch(error){
            throw error;
        }
    }

    async findAll(): Promise<Photo[]> {
        const photos = await this.photoRepository.find();
        return photos;
    }

    async update(id: number, updatedPhoto: UpdatePhotoDto): Promise<Photo> {
        try{
            const photo = await this.photoRepository.findOne({
                where: { id },
                relations: {
                    user: true,
                    studio: true,
                    photographer: true
                }
            });

            if (!photo) {
                throw new NotFoundException(`Фото с id ${id} не найдено`);
            }

            photo.category = updatedPhoto.category;
            photo.path = updatedPhoto.path;

            if (updatedPhoto.user_id!=null) {
                const user = await this.userRepository.findOne({
                    where: { id: updatedPhoto.user_id },
                });
                photo.user = user;
            }
            
            if (updatedPhoto.studio_id!=null) {
                const studio = await this.studioRepository.findOne({
                    where: { id: updatedPhoto.studio_id },
                });
                photo.studio = studio;
            }
    
            if (updatedPhoto.photographer_id!=null) {
                const photographer = await this.photographerRepository.findOne({
                    where: { id: updatedPhoto.photographer_id },
                });
                photo.photographer = photographer;
            }
            
            await this.photoRepository.save(photo);

            return photo;
        }
        catch(error){
            throw error;
        }
    }

    async remove(id: number) {
        try{
            const photo = await this.photoRepository.findOne({
                where: { id }
            });

            if (!photo) {
                throw new NotFoundException(`Фото с id ${id} не найдено`);
            }

            this.photoRepository.delete({id});
            return HttpStatus.OK;
        }
        catch(error){
            throw error;
        }
    }
}