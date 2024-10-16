"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudiosModule = void 0;
const common_1 = require("@nestjs/common");
const studio_entity_1 = require("./studio.entity");
const studios_controller_1 = require("./studios.controller");
const studios_service_1 = require("./studios.service");
const user_entity_1 = require("../users/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const booking_entity_1 = require("../bookings/booking.entity");
let StudiosModule = class StudiosModule {
};
exports.StudiosModule = StudiosModule;
exports.StudiosModule = StudiosModule = __decorate([
    (0, common_1.Module)({
        controllers: [studios_controller_1.StudiosController],
        providers: [studios_service_1.StudiosService],
        imports: [studio_entity_1.Studio, typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, studio_entity_1.Studio, booking_entity_1.Booking])],
    })
], StudiosModule);
//# sourceMappingURL=studios.module.js.map