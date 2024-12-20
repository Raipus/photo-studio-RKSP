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
exports.PhotographersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const booking_entity_1 = require("../bookings/booking.entity");
const argon2 = require("argon2");
const user_entity_1 = require("../users/user.entity");
const typeorm_2 = require("typeorm");
const photographer_entity_1 = require("./photographer.entity");
let PhotographersService = class PhotographersService {
    constructor(userRepository, photographerRepository, bookingRepository) {
        this.userRepository = userRepository;
        this.photographerRepository = photographerRepository;
        this.bookingRepository = bookingRepository;
    }
    async create(photographerNew) {
        try {
            const photographer = await this.photographerRepository.findOne({
                where: { email: photographerNew.email },
            });
            if (photographer) {
                throw new common_1.BadRequestException(`Фотограф с почтой ${photographerNew.email} уже существует!`);
            }
            const newPhotographer = this.photographerRepository.create();
            newPhotographer.fullname = photographerNew.fullname;
            newPhotographer.email = photographerNew.email;
            newPhotographer.password = await argon2.hash(photographerNew.password);
            newPhotographer.work_exp = photographerNew.work_exp;
            newPhotographer.cost = photographerNew.cost;
            newPhotographer.role = 'photographer';
            await this.photographerRepository.save(newPhotographer);
            return newPhotographer;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(email) {
        try {
            const photographer = await this.photographerRepository.findOne({
                where: { email },
            });
            return photographer;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        const photographers = await this.photographerRepository.find({
            order: {
                id: 'ASC',
            },
        });
        return photographers;
    }
    async update(id, updatedPhotographer) {
        try {
            const photographer = await this.photographerRepository.findOne({
                where: { id },
            });
            if (!photographer) {
                throw new common_1.NotFoundException(`Фотографа с id ${id} не найдено`);
            }
            photographer.fullname = updatedPhotographer.fullname;
            photographer.email = updatedPhotographer.email;
            photographer.password = await argon2.hash(updatedPhotographer.password);
            photographer.work_exp = updatedPhotographer.work_exp;
            photographer.cost = updatedPhotographer.cost;
            await this.photographerRepository.save(photographer);
            return photographer;
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        try {
            const photographer = await this.photographerRepository.findOne({
                where: { id },
            });
            if (!photographer) {
                throw new common_1.NotFoundException(`Фотографа с id ${id} не найдено`);
            }
            this.photographerRepository.delete({ id });
            return common_1.HttpStatus.OK;
        }
        catch (error) {
            throw error;
        }
    }
    async updateToken(id, updatedPhotographer) {
        try {
            const photographer = await this.photographerRepository.findOne({
                where: { id },
            });
            if (!photographer) {
                throw new common_1.NotFoundException(`Фотограф с id ${id} не найден`);
            }
            photographer.refreshToken = updatedPhotographer.refreshToken;
            await this.photographerRepository.save(photographer);
            return photographer;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.PhotographersService = PhotographersService;
exports.PhotographersService = PhotographersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(photographer_entity_1.Photographer)),
    __param(2, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PhotographersService);
//# sourceMappingURL=photographers.service.js.map