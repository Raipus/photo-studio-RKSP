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
exports.AuthorGuard = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("../bookings/booking.service");
const user_service_1 = require("../users/user.service");
let AuthorGuard = class AuthorGuard {
    constructor(bookingService, userService) {
        this.bookingService = bookingService;
        this.userService = userService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const path = request.url.split('/');
        const id = parseInt(request.params['id']);
        let entity;
        var flag = '';
        if (path.includes('bookings')) {
            entity = await this.bookingService.findOne(id);
            flag = 'bookings';
        }
        if (path.includes('users')) {
            entity = await this.userService.findOneId(id);
            flag = 'users';
        }
        const userId = request.user['sub'];
        const userRole = request.user['role'];
        if (userRole == 'admin')
            return true;
        if (flag == 'bookings') {
            if (entity && userId && entity.user.id == userId) {
                return true;
            }
        }
        else if (flag == 'users') {
            if (entity && userId && entity.id == userId) {
                return true;
            }
        }
        throw new common_1.UnauthorizedException('У Вас нет доступа к данному ресурсу!');
    }
};
exports.AuthorGuard = AuthorGuard;
exports.AuthorGuard = AuthorGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [booking_service_1.BookingsService,
        user_service_1.UsersService])
], AuthorGuard);
//# sourceMappingURL=author.guard.js.map