"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const photographer_entity_1 = require("../photographers/photographer.entity");
const studio_entity_1 = require("../studios/studio.entity");
const photo_entity_1 = require("./photo.entity");
const booking_entity_1 = require("../bookings/booking.entity");
const user_entity_1 = require("../users/user.entity");
const photo_service_1 = require("./photo.service");
const photo_controller_1 = require("./photo.controller");
const booking_service_1 = require("../bookings/booking.service");
let PhotosModule = class PhotosModule {
};
exports.PhotosModule = PhotosModule;
exports.PhotosModule = PhotosModule = __decorate([
    (0, common_1.Module)({
        controllers: [photo_controller_1.PhotosController],
        providers: [photo_service_1.PhotosService, booking_service_1.BookingsService],
        imports: [user_entity_1.User, typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, photographer_entity_1.Photographer, studio_entity_1.Studio, photo_entity_1.Photo, booking_entity_1.Booking])],
        exports: [photo_service_1.PhotosService],
    })
], PhotosModule);
//# sourceMappingURL=photo.module.js.map