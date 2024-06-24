import { HttpStatus, Injectable } from "@nestjs/common";
import { Studio } from "./studio.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Client } from "src/clients/client.entity";

@Injectable ()
export class StudiosService {
    constructor (
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
        @InjectRepository(Studio)
        private readonly studioRepository: Repository<Studio>
    ) {}

    async create(studioNew: Studio): Promise<Studio> {
        const studio = this.studioRepository.create();
        studio.name = studioNew.name;
        studio.location = studioNew.location;
        studio.description = studioNew.description;
        studio.clients = null;
        await this.studioRepository.save(studio);
        return studio;
    }

    async findOne(id: number): Promise<Studio> {
        return this.studioRepository.findOne({
            where: { id },
            relations: {clients: true}
        });
    }

    async findAll(): Promise<Studio[]> {
        const studios = await this.studioRepository.find();
        return studios;
    }

    async update(id: number, updatedStudio: Studio): Promise<Studio>  {
        const studio = await this.studioRepository.findOne({where: { id }});
        studio.name = updatedStudio.name;
        studio.location = updatedStudio.location;
        studio.description = updatedStudio.description;
        const clients = await this.clientRepository.findBy({
            id: In(updatedStudio.clients),
        });
        studio.clients = clients;
        await this.studioRepository.save(studio);
        return studio;
    }

    async remove(id: number) {
        this.studioRepository.delete({id});
        return HttpStatus.OK;
    }
}