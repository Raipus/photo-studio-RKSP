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
exports.Studio = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_entity_1 = require("../clients/client.entity");
const typeorm_1 = require("typeorm");
let Studio = class Studio {
};
exports.Studio = Studio;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Уникальный идентификатор' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Studio.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Уютный камин', description: 'Название студии' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Studio.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'г. Москва, Ленинский проспект, д. 6', description: 'Расположение студии' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Studio.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Помещение с красивым уютным камином', description: 'Описание студии' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Studio.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 4], description: 'Клиенты, забронировавшие студию' }),
    (0, typeorm_1.ManyToMany)((type) => client_entity_1.Client, (clients) => clients.studios),
    (0, typeorm_1.JoinTable)({
        name: 'client_studio',
        joinColumn: { name: 'studio_id' },
        inverseJoinColumn: { name: 'client_id' },
    }),
    __metadata("design:type", Array)
], Studio.prototype, "clients", void 0);
exports.Studio = Studio = __decorate([
    (0, typeorm_1.Entity)('studios')
], Studio);
//# sourceMappingURL=studio.entity.js.map