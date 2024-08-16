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
exports.StudiosController = void 0;
const create_studio_dto_1 = require("./dto/create-studio.dto");
const studio_entity_1 = require("./studio.entity");
const studios_service_1 = require("./studios.service");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
let StudiosController = class StudiosController {
    constructor(StudiosService) {
        this.StudiosService = StudiosService;
    }
    findAll() {
        return this.StudiosService.findAll();
    }
    findOne(id) {
        return this.StudiosService.findOne(+id);
    }
    update(id, updateStudio) {
        return this.StudiosService.update(+id, updateStudio);
    }
    create(createStudio) {
        return this.StudiosService.create(createStudio);
    }
    remove(id) {
        return this.StudiosService.remove(+id);
    }
};
exports.StudiosController = StudiosController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получить все студии' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StudiosController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получить конкретную студию' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudiosController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Изменить студию' }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, studio_entity_1.Studio]),
    __metadata("design:returntype", void 0)
], StudiosController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создать студию' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_studio_dto_1.CreateStudioDto]),
    __metadata("design:returntype", void 0)
], StudiosController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удалить студию' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudiosController.prototype, "remove", null);
exports.StudiosController = StudiosController = __decorate([
    (0, common_1.Controller)('studios'),
    (0, swagger_1.ApiTags)('Студии'),
    __metadata("design:paramtypes", [studios_service_1.StudiosService])
], StudiosController);
//# sourceMappingURL=studios.controller.js.map