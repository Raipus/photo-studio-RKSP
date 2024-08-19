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
exports.CreateBookingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const photographer_entity_1 = require("../../photographers/photographer.entity");
const studio_entity_1 = require("../../studios/studio.entity");
const user_entity_1 = require("../../users/user.entity");
class CreateBookingDto {
}
exports.CreateBookingDto = CreateBookingDto;
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: '2021-04-19', description: 'Дата брони' }),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: '5', description: 'Количество людей на брони' }),
    __metadata("design:type", Number)
], CreateBookingDto.prototype, "people_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID юзера', type: () => user_entity_1.User }),
    __metadata("design:type", user_entity_1.User)
], CreateBookingDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID студии', type: () => studio_entity_1.Studio }),
    __metadata("design:type", studio_entity_1.Studio)
], CreateBookingDto.prototype, "studio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID фотографа', type: () => photographer_entity_1.Photographer }),
    __metadata("design:type", photographer_entity_1.Photographer)
], CreateBookingDto.prototype, "photographer", void 0);
//# sourceMappingURL=create-booking.dto.js.map