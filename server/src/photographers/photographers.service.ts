import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Photographer } from "./photographer.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { User } from "src/users/user.entity";
import { CreatePhotographerDto } from "./dto/create-photographer.dto";

@Injectable ()
export class PhotographersService {
    constructor (
        @InjectRepository(User)
        private readonly clientRepository: Repository<User>,
        @InjectRepository(Photographer)
        private readonly photographerRepository: Repository<Photographer>
    ) {}

    async create(photographerNew: CreatePhotographerDto): Promise<Photographer> {
        const photographer = this.photographerRepository.create();
        photographer.fullname = photographerNew.fullname;
        photographer.phone = photographerNew.phone;
        photographer.work_exp = photographerNew.work_exp;
        await this.photographerRepository.save(photographer);
        return photographer;
    }

    async findOne(id: number): Promise<Photographer> {
        try{
            const photographer = await this.photographerRepository.findOne({
                where: { id },
                relations: {users: true}
            });

            if(!photographer){
                throw new NotFoundException(`Фотографа с id ${id} не найдено`);
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
            const photographer = await this.photographerRepository.findOne({
                where: { id },
                relations: {users: true}
            });

            if(!photographer){
                throw new NotFoundException(`Фотографа с id ${id} не найдено`);
            }

            photographer.fullname = updatedPhotographer.fullname;
            photographer.phone = updatedPhotographer.phone;
            photographer.work_exp = updatedPhotographer.work_exp;
            const clients = await this.clientRepository.findBy({
                id: In(updatedPhotographer.users),
            });
            photographer.users = clients;
            await this.photographerRepository.save(photographer);
            return photographer;
        }
        catch(error){
            throw error;
        }
    }

    async remove(id: number) {
        try{
            const photographer = await this.photographerRepository.findOne({
                where: { id },
                relations: {users: true}
            });

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