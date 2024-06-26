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
exports.Photographer = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_entity_1 = require("../clients/client.entity");
const typeorm_1 = require("typeorm");
let Photographer = class Photographer {
};
exports.Photographer = Photographer;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Уникальный идентификатор' }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Photographer.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Иванов Иван Иваныч', description: 'ФИО' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Photographer.prototype, "fullname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+7 985 242 52 64', description: 'Телефон' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Photographer.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '4', description: 'Опыт работы, в годах' }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Photographer.prototype, "work_exp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: [1, 4], description: 'Клиенты, забронировавшие фотографа' }),
    (0, typeorm_1.ManyToMany)((type) => client_entity_1.Client, (client) => client.photographers),
    (0, typeorm_1.JoinTable)({
        name: 'client_photographer',
        joinColumn: { name: 'photographer_id' },
        inverseJoinColumn: { name: 'client_id' },
    }),
    __metadata("design:type", Array)
], Photographer.prototype, "clients", void 0);
exports.Photographer = Photographer = __decorate([
    (0, typeorm_1.Entity)('photographers')
], Photographer);
//# sourceMappingURL=photographer.entity.js.map