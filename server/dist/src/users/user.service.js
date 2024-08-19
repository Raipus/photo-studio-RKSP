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
const photo_entity_1 = require("../photos/photo.entity");
const booking_entity_1 = require("../bookings/booking.entity");
let UsersService = class UsersService {
    constructor(userRepository, photographerRepository, studioRepository, photoRepository, bookingRepository) {
        this.userRepository = userRepository;
        this.photographerRepository = photographerRepository;
        this.studioRepository = studioRepository;
        this.photoRepository = photoRepository;
        this.bookingRepository = bookingRepository;
    }
    async create(userDto) {
        const user = this.userRepository.create();
        user.email = userDto.email;
        user.password = userDto.password;
        await this.userRepository.save(user);
        return user;
    }
    async findOne(email) {
        try {
            const user = await this.userRepository.findOne({ where: { email } });
            if (!user) {
                throw new common_1.NotFoundException(`Клиент с почтой ${email} не найден`);
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
                photo: true,
                bookings: true
            }
        });
        const incompleteUsers = users.map((user) => {
            const incompleteUser = new incomplete_user_dto_1.IncompleteUserDto();
            incompleteUser.fullname = user.fullname;
            incompleteUser.bookings = user.bookings.map((booking) => booking);
            return incompleteUser;
        });
        return incompleteUsers;
    }
    async update(id, updatedUser) {
        try {
            const user = await this.userRepository.findOne({
                where: { id },
                relations: {
                    photo: true,
                    bookings: true
                }
            });
            if (!user) {
                throw new common_1.NotFoundException(`Клиент с id ${id} не найден`);
            }
            user.fullname = updatedUser.fullname;
            user.email = updatedUser.email;
            user.phone = updatedUser.phone;
            user.password = updatedUser.password;
            user.role = updatedUser.role;
            if (updatedUser.bookings != null) {
                const bookings = await this.bookingRepository.findBy({
                    id: (0, typeorm_2.In)(updatedUser.bookings),
                });
                user.bookings = bookings;
            }
            if (updatedUser.photo != null) {
                const photo = await this.photoRepository.findOne({
                    where: { id: updatedUser.photo.id },
                });
                user.photo = photo;
            }
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
    __param(3, (0, typeorm_1.InjectRepository)(photo_entity_1.Photo)),
    __param(4, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=user.service.js.map