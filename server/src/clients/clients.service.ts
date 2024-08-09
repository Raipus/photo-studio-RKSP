import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Client } from "./client.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateClientDto } from "./dto/create-client.dto";
import { IncompleteClientDto } from "./dto/incomplete-client.dto";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";

@Injectable ()
export class ClientsService {
    constructor (
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
        @InjectRepository(Photographer)
        private readonly photographerRepository: Repository<Photographer>,
        @InjectRepository(Studio)
        private readonly studioRepository: Repository<Studio>
    ) {}

    async create(clientDto: CreateClientDto): Promise<Client> {
        const client = this.clientRepository.create();
        client.fullname = clientDto.fullname;
        client.phone = clientDto.phone;
        await this.clientRepository.save(client);
        return client;
    }

    async findOne(id: number): Promise<Client> {
        try{
            const client = await this.clientRepository.findOne({
                where: { id },
                relations: {studios: true, photographers: true}
            });

            if (!client) {
                throw new NotFoundException(`Клиент с id ${id} не найден`);
            }
            
            return client;
        }
        catch(error){
            throw error;
        }
    }

    async findAll(): Promise<Client[]> {
        const clients = await this.clientRepository.find();
        return clients;
    }

    async findIncomplete(): Promise<IncompleteClientDto[]> {
        const clients = await this.clientRepository.find({
            relations: {
                photographers: false,
                studios: true,
            }
        });
        const incompleteClients: IncompleteClientDto[] = clients.map((client) => {
            const incompleteClient = new IncompleteClientDto();
            incompleteClient.fullname = client.fullname;
            incompleteClient.studios = client.studios.map((studio) => studio.id);
            return incompleteClient;
        });
        return incompleteClients;
    }

    async update(id: number, updatedClient: Client): Promise<Client> {
        try{
            const client = await this.clientRepository.findOne({
                where: { id },
                relations: {studios: true, photographers: true}
            });

            if (!client) {
                throw new NotFoundException(`Клиент с id ${id} не найден`);
            }

            client.fullname = updatedClient.fullname;

            client.phone = updatedClient.phone;

            const studios = await this.studioRepository.findBy({
                id: In(updatedClient.studios),
            });
            client.studios = studios;

            const photographers = await this.photographerRepository.findBy({
                id: In(updatedClient.photographers),
            });
            client.photographers = photographers;

            await this.clientRepository.save(client);

            return client;
        }
        catch(error){
            throw error;
        }
        
        

        
    }

    async remove(id: number) {
        try{
            const client = await this.clientRepository.findOne({
                where: { id }
            });

            if (!client) {
                throw new NotFoundException(`Клиент с id ${id} не найден`);
            }

            this.clientRepository.delete({id});
            return HttpStatus.OK;
        }
        catch(error){
            throw error;
        }
    }
}