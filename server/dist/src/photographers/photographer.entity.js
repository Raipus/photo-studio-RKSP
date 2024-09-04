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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photographer = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const booking_entity_1 = require("../bookings/booking.entity");
const photo_entity_1 = require("../photos/photo.entity");
const typeorm_1 = require("typeorm");
let Photographer = class Photographer {
};
exports.Photographer = Photographer;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Уникальный идентификатор' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Photographer.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: 'Алексей', description: 'Имя' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Photographer.prototype, "fullname", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: 'someemail@mail.ru', description: 'Почта (Логин)' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Photographer.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsPhoneNumber)(),
    (0, swagger_1.ApiProperty)({ example: '+7 (985) 242-52-64', description: 'Телефон (Альтернативный логин)' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Photographer.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(6, { message: 'Пароль должен быть минимум 6 символов!' }),
    (0, swagger_1.ApiProperty)({ example: 'somepassword', description: 'Пароль' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Photographer.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: 'photographer', description: 'Роль пользователя' }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Photographer.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: '4', description: 'Опыт работы, в годах' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Photographer.prototype, "work_exp", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: '1600', description: 'Стоимость услуг за час в рублях' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Photographer.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '3', description: 'ID фото фотографа', type: () => photo_entity_1.Photo }),
    (0, typeorm_1.OneToOne)(() => photo_entity_1.Photo, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", photo_entity_1.Photo)
], Photographer.prototype, "photo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 4], description: 'ID всех бронь, где заказаны услуги данного фотографа', type: () => booking_entity_1.Booking }),
    (0, typeorm_1.OneToMany)(() => booking_entity_1.Booking, bookings => bookings.photographer),
    __metadata("design:type", Array)
], Photographer.prototype, "bookings", void 0);
exports.Photographer = Photographer = __decorate([
    (0, typeorm_1.Entity)('photographers')
], Photographer);
//# sourceMappingURL=photographer.entity.js.map