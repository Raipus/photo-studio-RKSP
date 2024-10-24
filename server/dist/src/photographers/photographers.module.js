"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotographersModule = void 0;
const common_1 = require("@nestjs/common");
const photographer_entity_1 = require("./photographer.entity");
const photographers_controller_1 = require("./photographers.controller");
const photographers_service_1 = require("./photographers.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/user.entity");
const booking_entity_1 = require("../bookings/booking.entity");
let PhotographersModule = class PhotographersModule {
};
exports.PhotographersModule = PhotographersModule;
exports.PhotographersModule = PhotographersModule = __decorate([
    (0, common_1.Module)({
        controllers: [photographers_controller_1.PhotographersController],
        providers: [photographers_service_1.PhotographersService],
        imports: [photographer_entity_1.Photographer, typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, photographer_entity_1.Photographer, booking_entity_1.Booking])],
        exports: [photographers_service_1.PhotographersService],
    })
], PhotographersModule);
//# sourceMappingURL=photographers.module.js.map