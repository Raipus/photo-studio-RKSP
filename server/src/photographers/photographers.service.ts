import { HttpStatus, Injectable } from "@nestjs/common";
import { Photographer } from "./photographer.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Client } from "src/clients/client.entity";

@Injectable ()
export class PhotographersService {
    constructor (
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
        @InjectRepository(Photographer)
        private readonly photographerRepository: Repository<Photographer>
    ) {}

    async create(photographerNew: Photographer): Promise<Photographer> {
        const photographer = this.photographerRepository.create();
        photographer.fullname = photographerNew.fullname;
        photographer.phone = photographerNew.phone;
        photographer.work_exp = photographerNew.work_exp;
        photographer.clients = null;
        await this.photographerRepository.save(photographer);
        return photographer;
    }

    async findOne(id: number): Promise<Photographer> {
        return this.photographerRepository.findOne({
            where: { id },
            relations: {clients: true}
        });
    }

    async findAll(): Promise<Photographer[]> {
        const photographers = await this.photographerRepository.find();
        return photographers;
    }

    async update(id: number, updatedPhotographer: Photographer): Promise<Photographer>  {
        const photographer = await this.photographerRepository.findOne({where: { id }});
        photographer.fullname = updatedPhotographer.fullname;
        photographer.phone = updatedPhotographer.phone;
        photographer.work_exp = updatedPhotographer.work_exp;
        const clients = await this.clientRepository.findBy({
            id: In(updatedPhotographer.clients),
        });
        photographer.clients = clients;
        await this.photographerRepository.save(photographer);
        return photographer;
    }

    async remove(id: number) {
        this.photographerRepository.delete({id});
        return HttpStatus.OK;
    }
}