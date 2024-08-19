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
exports.CreatePhotoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const photographer_entity_1 = require("../../photographers/photographer.entity");
const studio_entity_1 = require("../../studios/studio.entity");
const user_entity_1 = require("../../users/user.entity");
class CreatePhotoDto {
}
exports.CreatePhotoDto = CreatePhotoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: 'User', description: 'Категория фотографии для удобства (User, Photographer, Studio)' }),
    __metadata("design:type", String)
], CreatePhotoDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: '/client/src/photos/img.png', description: 'Путь до файла' }),
    __metadata("design:type", String)
], CreatePhotoDto.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 4], description: 'ID студии (Может быть NULL)', type: () => studio_entity_1.Studio }),
    __metadata("design:type", studio_entity_1.Studio)
], CreatePhotoDto.prototype, "studio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID фотографа (Может быть NULL)', type: () => photographer_entity_1.Photographer }),
    __metadata("design:type", photographer_entity_1.Photographer)
], CreatePhotoDto.prototype, "photographer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4, description: 'ID клиента (Может быть NULL)', type: () => user_entity_1.User }),
    __metadata("design:type", user_entity_1.User)
], CreatePhotoDto.prototype, "user", void 0);
//# sourceMappingURL=create-photo.dto.js.map