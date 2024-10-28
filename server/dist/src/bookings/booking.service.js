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
const user_service_1 = require("../users/user.service");
const photographers_service_1 = require("../photographers/photographers.service");
let BookingsService = class BookingsService {
    constructor(userRepository, photographerRepository, studioRepository, bookingRepository, usersService, photographersService) {
        this.userRepository = userRepository;
        this.photographerRepository = photographerRepository;
        this.studioRepository = studioRepository;
        this.bookingRepository = bookingRepository;
        this.usersService = usersService;
        this.photographersService = photographersService;
    }
    async create(bookingDto) {
        const booking = this.bookingRepository.create();
        booking.date = bookingDto.date;
        booking.people_number = bookingDto.people_number;
        console.log(bookingDto.user_id);
        if (bookingDto.user_id != null) {
            const user = await this.userRepository.findOne({
                where: { id: bookingDto.user_id },
            });
            if (!user) {
                throw new common_1.NotFoundException(`Пользователь с id ${bookingDto.user_id} не найден!`);
            }
            booking.user = user;
        }
        if (bookingDto.studio_id != null) {
            const studio = await this.studioRepository.findOne({
                where: { id: bookingDto.studio_id },
            });
            if (!studio) {
                throw new common_1.NotFoundException(`Студия с id ${bookingDto.studio_id} не найдена!`);
            }
            booking.studio = studio;
        }
        if (bookingDto.photographer_id != null) {
            const photographer = await this.photographerRepository.findOne({
                where: { id: bookingDto.photographer_id },
            });
            if (!photographer) {
                throw new common_1.NotFoundException(`Фотограф с id ${bookingDto.photographer_id} не найден!`);
            }
            booking.photographer = photographer;
        }
        const isAvailable = await this.check(bookingDto.studio_id, bookingDto.date);
        if (isAvailable.available) {
            await this.bookingRepository.save(booking);
            return booking;
        }
        else {
            throw new common_1.BadRequestException(`Студия ${booking.studio.name} уже забронирована на время ${booking.date}!`);
        }
    }
    async findOne(id) {
        try {
            const booking = await this.bookingRepository.findOne({
                where: { id },
                relations: {
                    user: true,
                    studio: true,
                    photographer: true,
                },
            });
            if (!booking) {
                throw new common_1.NotFoundException(`Бронь с ID ${id} не найдена`);
            }
            return booking;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll(email, role) {
        if (role == 'admin') {
            const bookings = await this.bookingRepository.find({
                relations: {
                    user: true,
                    studio: true,
                    photographer: true,
                },
                order: {
                    id: 'ASC',
                },
            });
            if (!bookings) {
                throw new common_1.NotFoundException(`Брони от почты ${email} не найдены`);
            }
            return bookings;
        }
        else if (role == 'user') {
            const user = await this.usersService.findOne(email);
            if (!user) {
                throw new common_1.NotFoundException(`Пользователь с почтой ${email} не найден`);
            }
            const bookings = await this.bookingRepository.find({
                relations: {
                    user: true,
                    studio: true,
                    photographer: true,
                },
                where: {
                    user: user,
                },
            });
            return bookings;
        }
        else if (role == 'photographer') {
            const photographer = await this.photographersService.findOne(email);
            if (!photographer) {
                throw new common_1.NotFoundException(`Фотограф с почтой ${email} не найден`);
            }
            const bookings = await this.bookingRepository.find({
                relations: {
                    user: true,
                    studio: true,
                    photographer: true,
                },
                where: {
                    photographer: photographer,
                },
            });
            return bookings;
        }
        else {
            throw new common_1.BadRequestException('Что-то пошло не так!');
        }
    }
    async update(id, updatedBooking) {
        try {
            const booking = await this.bookingRepository.findOne({
                where: { id },
                relations: {
                    user: true,
                    studio: true,
                    photographer: true,
                },
            });
            if (!booking) {
                throw new common_1.NotFoundException(`Бронь с id ${id} не найдена`);
            }
            if (updatedBooking.date != null) {
                booking.date = updatedBooking.date;
            }
            if (updatedBooking.people_number != null) {
                booking.people_number = updatedBooking.people_number;
            }
            if (updatedBooking.user_id != null) {
                const user = await this.userRepository.findOne({
                    where: { id: updatedBooking.user_id },
                });
                if (!user) {
                    throw new common_1.NotFoundException(`Пользователь с id ${updatedBooking.user_id} не найден!`);
                }
                booking.user = user;
            }
            if (updatedBooking.studio_id != null) {
                const studio = await this.studioRepository.findOne({
                    where: { id: updatedBooking.studio_id },
                });
                if (!studio) {
                    throw new common_1.NotFoundException(`Студия с id ${updatedBooking.studio_id} не найдена!`);
                }
                booking.studio = studio;
            }
            if (updatedBooking.photographer_id != null) {
                const photographer = await this.photographerRepository.findOne({
                    where: { id: updatedBooking.photographer_id },
                });
                if (!photographer) {
                    throw new common_1.NotFoundException(`Фотограф с id ${updatedBooking.photographer_id} не найден!`);
                }
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
                where: { id },
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
    async check(studioId, date) {
        try {
            let isAvailable = false;
            const studio = await this.studioRepository.findOne({
                where: { id: studioId },
            });
            const booking = await this.bookingRepository.findOne({
                where: {
                    studio,
                    date,
                },
            });
            if (booking) {
                isAvailable = false;
                return { available: isAvailable };
            }
            else {
                isAvailable = true;
                return { available: isAvailable };
            }
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
        typeorm_2.Repository,
        user_service_1.UsersService,
        photographers_service_1.PhotographersService])
], BookingsService);
//# sourceMappingURL=booking.service.js.map