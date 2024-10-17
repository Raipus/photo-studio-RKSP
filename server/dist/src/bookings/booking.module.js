"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const photographer_entity_1 = require("../photographers/photographer.entity");
const studio_entity_1 = require("../studios/studio.entity");
const booking_entity_1 = require("./booking.entity");
const user_entity_1 = require("../users/user.entity");
const booking_service_1 = require("./booking.service");
const booking_controller_1 = require("./booking.controller");
const user_module_1 = require("../users/user.module");
const photographers_module_1 = require("../photographers/photographers.module");
let BookingsModule = class BookingsModule {
};
exports.BookingsModule = BookingsModule;
exports.BookingsModule = BookingsModule = __decorate([
    (0, common_1.Module)({
        controllers: [booking_controller_1.BookingsController],
        providers: [booking_service_1.BookingsService],
        imports: [user_entity_1.User, (0, common_1.forwardRef)(() => user_module_1.UsersModule), photographers_module_1.PhotographersModule, typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, photographer_entity_1.Photographer, studio_entity_1.Studio, booking_entity_1.Booking])],
        exports: [booking_service_1.BookingsService],
    })
], BookingsModule);
//# sourceMappingURL=booking.module.js.map