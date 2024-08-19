"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./users/user.module");
const photographers_module_1 = require("./photographers/photographers.module");
const studios_module_1 = require("./studios/studios.module");
const typeorm_1 = require("@nestjs/typeorm");
const logger_middleware_1 = require("./middleware/logger.middleware");
const booking_module_1 = require("./bookings/booking.module");
const photo_module_1 = require("./photos/photo.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('users', 'studios', 'photographers', 'photos', 'bookings');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UsersModule,
            photographers_module_1.PhotographersModule,
            studios_module_1.StudiosModule,
            booking_module_1.BookingsModule,
            photo_module_1.PhotosModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                port: 5432,
                username: 'education',
                password: 'password',
                host: 'localhost',
                synchronize: false,
                logging: 'all',
                entities: ['dist/**/*.entity{.ts,.js}'],
            })
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map