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
exports.PhotosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const photographer_entity_1 = require("../photographers/photographer.entity");
const studio_entity_1 = require("../studios/studio.entity");
const user_entity_1 = require("../users/user.entity");
const photo_entity_1 = require("./photo.entity");
let PhotosService = class PhotosService {
    constructor(userRepository, photographerRepository, studioRepository, photoRepository) {
        this.userRepository = userRepository;
        this.photographerRepository = photographerRepository;
        this.studioRepository = studioRepository;
        this.photoRepository = photoRepository;
    }
    async create(photoDto) {
        const photo = this.photoRepository.create();
        photo.category = photoDto.category;
        photo.path = photoDto.path;
        if (photoDto.user != null) {
            const user = await this.userRepository.findOne({
                where: { id: photoDto.user.id },
            });
            photo.user = user;
        }
        if (photoDto.studio != null) {
            const studio = await this.studioRepository.findOne({
                where: { id: photoDto.studio.id },
            });
            photo.studio = studio;
        }
        if (photoDto.photographer != null) {
            const photographer = await this.photographerRepository.findOne({
                where: { id: photoDto.photographer.id },
            });
            photo.photographer = photographer;
        }
        await this.photoRepository.save(photo);
        return photo;
    }
    async findOne(id) {
        try {
            const photo = await this.photoRepository.findOne({ where: { id } });
            if (!photo) {
                throw new common_1.NotFoundException(`Фото с ID ${id} не найдено`);
            }
            return photo;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        const photos = await this.photoRepository.find();
        return photos;
    }
    async update(id, updatedPhoto) {
        try {
            const photo = await this.photoRepository.findOne({
                where: { id },
                relations: {
                    user: true,
                    studio: true,
                    photographer: true
                }
            });
            if (!photo) {
                throw new common_1.NotFoundException(`Фото с id ${id} не найдено`);
            }
            photo.category = updatedPhoto.category;
            photo.path = updatedPhoto.path;
            if (updatedPhoto.user != null) {
                const user = await this.userRepository.findOne({
                    where: { id: updatedPhoto.user.id },
                });
                photo.user = user;
            }
            if (updatedPhoto.studio != null) {
                const studio = await this.studioRepository.findOne({
                    where: { id: updatedPhoto.studio.id },
                });
                photo.studio = studio;
            }
            if (updatedPhoto.photographer != null) {
                const photographer = await this.photographerRepository.findOne({
                    where: { id: updatedPhoto.photographer.id },
                });
                photo.photographer = photographer;
            }
            await this.photoRepository.save(photo);
            return photo;
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        try {
            const photo = await this.photoRepository.findOne({
                where: { id }
            });
            if (!photo) {
                throw new common_1.NotFoundException(`Фото с id ${id} не найдено`);
            }
            this.photoRepository.delete({ id });
            return common_1.HttpStatus.OK;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.PhotosService = PhotosService;
exports.PhotosService = PhotosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(photographer_entity_1.Photographer)),
    __param(2, (0, typeorm_1.InjectRepository)(studio_entity_1.Studio)),
    __param(3, (0, typeorm_1.InjectRepository)(photo_entity_1.Photo)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PhotosService);
//# sourceMappingURL=photo.service.js.map