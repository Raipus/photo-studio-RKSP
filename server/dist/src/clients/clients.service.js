"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const client_entity_1 = require("./client.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const incomplete_client_dto_1 = require("./dto/incomplete-client.dto");
const photographer_entity_1 = require("../photographers/photographer.entity");
const studio_entity_1 = require("../studios/studio.entity");
let ClientsService = class ClientsService {
    constructor(clientRepository, photographerRepository, studioRepository) {
        this.clientRepository = clientRepository;
        this.photographerRepository = photographerRepository;
        this.studioRepository = studioRepository;
    }
    async create(clientDto) {
        const client = this.clientRepository.create();
        client.fullname = clientDto.fullname;
        client.phone = clientDto.phone;
        await this.clientRepository.save(client);
        return client;
    }
    async findOne(id) {
        return this.clientRepository.findOne({
            where: { id },
            relations: { studios: true, photographers: true }
        });
    }
    async findAll() {
        const clients = await this.clientRepository.find();
        return clients;
    }
    async findIncomplete() {
        const clients = await this.clientRepository.find({
            relations: {
                photographers: true,
                studios: true,
            }
        });
        const incompleteClients = clients.map((client) => {
            const incompleteClient = new incomplete_client_dto_1.IncompleteClientDto();
            incompleteClient.fullname = client.fullname;
            incompleteClient.studios = client.studios.map((studio) => studio.id);
            return incompleteClient;
        });
        return incompleteClients;
    }
    async update(id, updatedClient) {
        const client = await this.clientRepository.findOne({
            where: { id },
            relations: { studios: true, photographers: true }
        });
        client.fullname = updatedClient.fullname;
        client.phone = updatedClient.phone;
        const studios = await this.studioRepository.findBy({
            id: (0, typeorm_2.In)(updatedClient.studios),
        });
        client.studios = studios;
        const photographers = await this.photographerRepository.findBy({
            id: (0, typeorm_2.In)(updatedClient.photographers),
        });
        client.photographers = photographers;
        await this.clientRepository.save(client);
        return client;
    }
    remove(id) {
        this.clientRepository.delete({ id });
        return common_1.HttpStatus.OK;
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __param(1, (0, typeorm_1.InjectRepository)(photographer_entity_1.Photographer)),
    __param(2, (0, typeorm_1.InjectRepository)(studio_entity_1.Studio)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ClientsService);
//# sourceMappingURL=clients.service.js.map