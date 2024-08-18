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
exports.Photo = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const photographer_entity_1 = require("../photographers/photographer.entity");
const studio_entity_1 = require("../studios/studio.entity");
const user_entity_1 = require("../users/user.entity");
const typeorm_1 = require("typeorm");
let Photo = class Photo {
};
exports.Photo = Photo;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Уникальный идентификатор' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Photo.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: 'User', description: 'Категория фотографии для удобства (User, Photographer, Studio)' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Photo.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: '/client/src/photos/img.png', description: 'Путь до файла' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Photo.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 4], description: 'ID студии (Может быть NULL)' }),
    (0, typeorm_1.ManyToOne)(() => studio_entity_1.Studio, studio => studio.photos, { nullable: true }),
    __metadata("design:type", studio_entity_1.Studio)
], Photo.prototype, "studio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID фотографа (Может быть NULL)' }),
    (0, typeorm_1.OneToOne)(() => photographer_entity_1.Photographer, photographer => photographer.photo, { nullable: true }),
    __metadata("design:type", photographer_entity_1.Photographer)
], Photo.prototype, "photographer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4, description: 'ID клиента (Может быть NULL)' }),
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, user => user.photo, { nullable: true }),
    __metadata("design:type", user_entity_1.User)
], Photo.prototype, "user", void 0);
exports.Photo = Photo = __decorate([
    (0, typeorm_1.Entity)('photo')
], Photo);
//# sourceMappingURL=photo.entity.js.map