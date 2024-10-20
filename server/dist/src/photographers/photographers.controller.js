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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotographersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_photographer_dto_1 = require("./dto/create-photographer.dto");
const photographers_service_1 = require("./photographers.service");
const accessToken_guard_1 = require("../guards/accessToken.guard");
const admin_guard_1 = require("../guards/admin.guard");
let PhotographersController = class PhotographersController {
    constructor(PhotographersService) {
        this.PhotographersService = PhotographersService;
    }
    findAll() {
        return this.PhotographersService.findAll();
    }
    findOne(email) {
        return this.PhotographersService.findOne(email);
    }
    update(id, updatePhotographer) {
        return this.PhotographersService.update(+id, updatePhotographer);
    }
    create(createPhotographer) {
        return this.PhotographersService.create(createPhotographer);
    }
    remove(id) {
        return this.PhotographersService.remove(+id);
    }
};
exports.PhotographersController = PhotographersController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получить всех фотографов' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PhotographersController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Получить конкретного фотографа' }),
    (0, common_1.Get)(':email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PhotographersController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Изменить фотографа' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_photographer_dto_1.CreatePhotographerDto]),
    __metadata("design:returntype", void 0)
], PhotographersController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Создать фотографа' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_photographer_dto_1.CreatePhotographerDto]),
    __metadata("design:returntype", void 0)
], PhotographersController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Удалить фотографа' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PhotographersController.prototype, "remove", null);
exports.PhotographersController = PhotographersController = __decorate([
    (0, common_1.Controller)('photographers'),
    (0, swagger_1.ApiTags)('Фотографы'),
    __metadata("design:paramtypes", [photographers_service_1.PhotographersService])
], PhotographersController);
//# sourceMappingURL=photographers.controller.js.map