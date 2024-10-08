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
exports.IncompleteUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const booking_entity_1 = require("../../bookings/booking.entity");
class IncompleteUserDto {
}
exports.IncompleteUserDto = IncompleteUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Алексей', description: 'Имя' }),
    __metadata("design:type", String)
], IncompleteUserDto.prototype, "fullname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 4], description: 'ID всех бронь пользователя', type: () => booking_entity_1.Booking }),
    __metadata("design:type", Array)
], IncompleteUserDto.prototype, "bookings", void 0);
//# sourceMappingURL=incomplete-user.dto.js.map