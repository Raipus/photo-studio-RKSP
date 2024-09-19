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
exports.UpdatePhotoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdatePhotoDto {
}
exports.UpdatePhotoDto = UpdatePhotoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: 'User', description: 'Категория фотографии для удобства (User, Photographer, Studio)' }),
    __metadata("design:type", String)
], UpdatePhotoDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: '/client/src/photos/img.png', description: 'Путь до файла' }),
    __metadata("design:type", String)
], UpdatePhotoDto.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 4], description: 'ID студии (Может быть NULL)' }),
    __metadata("design:type", Number)
], UpdatePhotoDto.prototype, "studio_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID фотографа (Может быть NULL)' }),
    __metadata("design:type", Number)
], UpdatePhotoDto.prototype, "photographer_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4, description: 'ID клиента (Может быть NULL)' }),
    __metadata("design:type", Number)
], UpdatePhotoDto.prototype, "user_id", void 0);
//# sourceMappingURL=update-photo.dto.js.map