import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Photographer } from "./photographer.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { User } from "src/users/user.entity";
import { CreatePhotographerDto } from "./dto/create-photographer.dto";
import { Photo } from "src/photos/photo.entity";
import { Booking } from "src/bookings/booking.entity";

@Injectable ()
export class PhotographersService {
    constructor (
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Photographer)
        private readonly photographerRepository: Repository<Photographer>,
        @InjectRepository(Photo)
        private readonly photoRepository: Repository<Photo>,
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>
    ) {}

    async create(photographerNew: CreatePhotographerDto): Promise<Photographer> {
        const photographer = this.photographerRepository.create();
        photographer.fullname = photographerNew.fullname;
        photographer.email = photographerNew.email;
        photographer.password = photographerNew.password;
        photographer.work_exp = photographerNew.work_exp;
        photographer.cost = photographerNew.cost;
        await this.photographerRepository.save(photographer);
        return photographer;
    }

    async findOne(email: string): Promise<Photographer> {
        try{
            const photographer = await this.photographerRepository.findOne({ where: { email } });

            if(!photographer){
                throw new NotFoundException(`Фотографа с почтой ${email} не найдено`);
            }

            return photographer;
        }
        catch(error){
            throw error;
        }
    }

    async findAll(): Promise<Photographer[]> {
        const photographers = await this.photographerRepository.find();
        return photographers;
    }

    async update(id: number, updatedPhotographer: Photographer): Promise<Photographer>  {

        try{
            const photographer = await this.photographerRepository.findOne({ where: { id } });

            if(!photographer){
                throw new NotFoundException(`Фотографа с id ${id} не найдено`);
            }

            photographer.fullname = updatedPhotographer.fullname;
            photographer.email = updatedPhotographer.email;
            photographer.password = updatedPhotographer.password;
            photographer.work_exp = updatedPhotographer.work_exp;
            photographer.cost = updatedPhotographer.cost;

            if (updatedPhotographer.photo!=null) {
                const photo = await this.photoRepository.findOne({
                    where: { id: updatedPhotographer.photo.id },
                });
                photographer.photo = photo;
            }

            if (updatedPhotographer.bookings!=null) {
                const bookings = await this.bookingRepository.findBy({
                    id: In(updatedPhotographer.bookings),
                });
                photographer.bookings = bookings;
            }

            await this.photographerRepository.save(photographer);
            
            return photographer;
        }
        catch(error){
            throw error;
        }
    }

    async remove(id: number) {
        try{
            const photographer = await this.photographerRepository.findOne({ where: { id } });

            if(!photographer){
                throw new NotFoundException(`Фотографа с id ${id} не найдено`);
            }

            this.photographerRepository.delete({id});
            return HttpStatus.OK;
        }
        catch(error){
            throw error;
        }
    }
}