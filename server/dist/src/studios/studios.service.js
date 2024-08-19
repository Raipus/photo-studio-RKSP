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
exports.StudiosService = void 0;
const common_1 = require("@nestjs/common");
const studio_entity_1 = require("./studio.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const photo_entity_1 = require("../photos/photo.entity");
const booking_entity_1 = require("../bookings/booking.entity");
let StudiosService = class StudiosService {
    constructor(bookingRepository, studioRepository, photoRepository) {
        this.bookingRepository = bookingRepository;
        this.studioRepository = studioRepository;
        this.photoRepository = photoRepository;
    }
    async create(studioNew) {
        const studio = this.studioRepository.create();
        studio.name = studioNew.name;
        studio.location = studioNew.location;
        studio.description = studioNew.description;
        studio.cost = studioNew.cost;
        await this.studioRepository.save(studio);
        return studio;
    }
    async findOne(id) {
        try {
            const studio = await this.studioRepository.findOne({ where: { id } });
            if (!studio) {
                throw new common_1.NotFoundException(`Студия с id ${id} не найдена`);
            }
            return studio;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        const studios = await this.studioRepository.find();
        return studios;
    }
    async update(id, updatedStudio) {
        try {
            const studio = await this.studioRepository.findOne({
                where: { id },
                relations: {
                    photos: true,
                    bookings: true
                }
            });
            if (!studio) {
                throw new common_1.NotFoundException(`Студия с id ${id} не найдена`);
            }
            studio.name = updatedStudio.name;
            studio.location = updatedStudio.location;
            studio.description = updatedStudio.description;
            studio.cost = updatedStudio.cost;
            if (updatedStudio.bookings != null) {
                const bookings = await this.bookingRepository.findBy({
                    id: (0, typeorm_2.In)(updatedStudio.bookings),
                });
                studio.bookings = bookings;
            }
            if (updatedStudio.photos != null) {
                const photos = await this.photoRepository.findBy({
                    id: (0, typeorm_2.In)(updatedStudio.photos),
                });
                studio.photos = photos;
            }
            await this.studioRepository.save(studio);
            return studio;
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        try {
            const studio = await this.studioRepository.findOne({ where: { id } });
            if (!studio) {
                throw new common_1.NotFoundException(`Студия с id ${id} не найдена`);
            }
            this.studioRepository.delete({ id });
            return common_1.HttpStatus.OK;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.StudiosService = StudiosService;
exports.StudiosService = StudiosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __param(1, (0, typeorm_1.InjectRepository)(studio_entity_1.Studio)),
    __param(2, (0, typeorm_1.InjectRepository)(photo_entity_1.Photo)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], StudiosService);
//# sourceMappingURL=studios.service.js.map