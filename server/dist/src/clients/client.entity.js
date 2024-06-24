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
exports.Client = void 0;
const swagger_1 = require("@nestjs/swagger");
const photographer_entity_1 = require("../photographers/photographer.entity");
const studio_entity_1 = require("../studios/studio.entity");
const typeorm_1 = require("typeorm");
let Client = class Client {
};
exports.Client = Client;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Уникальный идентификатор' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Client.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Иванов Иван Иваныч', description: 'ФИО' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Client.prototype, "fullname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+7 985 242 52 64', description: 'Телефон' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Client.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 4], description: 'Студии, забронированные клиентом' }),
    (0, typeorm_1.ManyToMany)((type) => studio_entity_1.Studio, (studio) => studio.clients),
    (0, typeorm_1.JoinTable)({
        name: 'client_studio',
        joinColumn: { name: 'client_id' },
        inverseJoinColumn: { name: 'studio_id' },
    }),
    __metadata("design:type", Array)
], Client.prototype, "studios", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 4], description: 'Фотографы, забронированные клиентом' }),
    (0, typeorm_1.ManyToMany)((type) => photographer_entity_1.Photographer, (photographer) => photographer.clients),
    (0, typeorm_1.JoinTable)({
        name: 'client_photographer',
        joinColumn: { name: 'client_id' },
        inverseJoinColumn: { name: 'photographer_id' },
    }),
    __metadata("design:type", Array)
], Client.prototype, "photographers", void 0);
exports.Client = Client = __decorate([
    (0, typeorm_1.Entity)('clients')
], Client);
//# sourceMappingURL=client.entity.js.map