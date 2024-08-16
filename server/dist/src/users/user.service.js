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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const incomplete_user_dto_1 = require("./dto/incomplete-user.dto");
const photographer_entity_1 = require("../photographers/photographer.entity");
const studio_entity_1 = require("../studios/studio.entity");
let UsersService = class UsersService {
    constructor(userRepository, photographerRepository, studioRepository) {
        this.userRepository = userRepository;
        this.photographerRepository = photographerRepository;
        this.studioRepository = studioRepository;
    }
    async create(userDto) {
        const user = this.userRepository.create();
        user.fullname = userDto.fullname;
        user.phone = userDto.phone;
        await this.userRepository.save(user);
        return user;
    }
    async findOne(id) {
        try {
            const user = await this.userRepository.findOne({
                where: { id },
                relations: { studios: true, photographers: true }
            });
            if (!user) {
                throw new common_1.NotFoundException(`Клиент с id ${id} не найден`);
            }
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        const users = await this.userRepository.find();
        return users;
    }
    async findIncomplete() {
        const users = await this.userRepository.find({
            relations: {
                photographers: false,
                studios: true,
            }
        });
        const incompleteUsers = users.map((user) => {
            const incompleteUser = new incomplete_user_dto_1.IncompleteUserDto();
            incompleteUser.fullname = user.fullname;
            incompleteUser.studios = user.studios.map((studio) => studio.id);
            return incompleteUser;
        });
        return incompleteUsers;
    }
    async update(id, updatedUser) {
        try {
            const user = await this.userRepository.findOne({
                where: { id },
                relations: { studios: true, photographers: true }
            });
            if (!user) {
                throw new common_1.NotFoundException(`Клиент с id ${id} не найден`);
            }
            user.fullname = updatedUser.fullname;
            user.phone = updatedUser.phone;
            const studios = await this.studioRepository.findBy({
                id: (0, typeorm_2.In)(updatedUser.studios),
            });
            user.studios = studios;
            const photographers = await this.photographerRepository.findBy({
                id: (0, typeorm_2.In)(updatedUser.photographers),
            });
            user.photographers = photographers;
            await this.userRepository.save(user);
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        try {
            const user = await this.userRepository.findOne({
                where: { id }
            });
            if (!user) {
                throw new common_1.NotFoundException(`Клиент с id ${id} не найден`);
            }
            this.userRepository.delete({ id });
            return common_1.HttpStatus.OK;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(photographer_entity_1.Photographer)),
    __param(2, (0, typeorm_1.InjectRepository)(studio_entity_1.Studio)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=user.service.js.map