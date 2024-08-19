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
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const photographer_entity_1 = require("../photographers/photographer.entity");
const studio_entity_1 = require("../studios/studio.entity");
const booking_entity_1 = require("./booking.entity");
const user_entity_1 = require("../users/user.entity");
let BookingsService = class BookingsService {
    constructor(userRepository, photographerRepository, studioRepository, bookingRepository) {
        this.userRepository = userRepository;
        this.photographerRepository = photographerRepository;
        this.studioRepository = studioRepository;
        this.bookingRepository = bookingRepository;
    }
    async create(bookingDto) {
        const booking = this.bookingRepository.create();
        booking.date = bookingDto.date;
        booking.people_number = bookingDto.people_number;
        if (bookingDto.user != null) {
            const user = await this.userRepository.findOne({
                where: { id: bookingDto.user.id },
            });
            booking.user = user;
        }
        if (bookingDto.studio != null) {
            const studio = await this.studioRepository.findOne({
                where: { id: bookingDto.studio.id },
            });
            booking.studio = studio;
        }
        if (bookingDto.photographer != null) {
            const photographer = await this.photographerRepository.findOne({
                where: { id: bookingDto.photographer.id },
            });
            booking.photographer = photographer;
        }
        await this.bookingRepository.save(booking);
        return booking;
    }
    async findOne(id) {
        try {
            const booking = await this.bookingRepository.findOne({ where: { id } });
            if (!booking) {
                throw new common_1.NotFoundException(`Бронь с ID ${id} не найдена`);
            }
            return booking;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        const bookings = await this.bookingRepository.find();
        return bookings;
    }
    async update(id, updatedBooking) {
        try {
            const booking = await this.bookingRepository.findOne({
                where: { id },
                relations: {
                    user: true,
                    studio: true,
                    photographer: true
                }
            });
            if (!booking) {
                throw new common_1.NotFoundException(`Бронь с id ${id} не найдена`);
            }
            booking.date = updatedBooking.date;
            booking.people_number = updatedBooking.people_number;
            if (updatedBooking.user != null) {
                const user = await this.userRepository.findOne({
                    where: { id: updatedBooking.user.id },
                });
                booking.user = user;
            }
            if (updatedBooking.studio != null) {
                const studio = await this.studioRepository.findOne({
                    where: { id: updatedBooking.studio.id },
                });
                booking.studio = studio;
            }
            if (updatedBooking.photographer != null) {
                const photographer = await this.photographerRepository.findOne({
                    where: { id: updatedBooking.photographer.id },
                });
                booking.photographer = photographer;
            }
            await this.bookingRepository.save(booking);
            return booking;
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        try {
            const booking = await this.bookingRepository.findOne({
                where: { id }
            });
            if (!booking) {
                throw new common_1.NotFoundException(`Бронь с id ${id} не найдена`);
            }
            this.bookingRepository.delete({ id });
            return common_1.HttpStatus.OK;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(photographer_entity_1.Photographer)),
    __param(2, (0, typeorm_1.InjectRepository)(studio_entity_1.Studio)),
    __param(3, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BookingsService);
//# sourceMappingURL=booking.service.js.map