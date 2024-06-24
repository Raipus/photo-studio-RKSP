"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsModule = void 0;
const common_1 = require("@nestjs/common");
const client_entity_1 = require("./client.entity");
const clients_controller_1 = require("./clients.controller");
const clients_service_1 = require("./clients.service");
const datasource_module_1 = require("../datasource/datasource.module");
const typeorm_1 = require("@nestjs/typeorm");
const photographer_entity_1 = require("../photographers/photographer.entity");
const studio_entity_1 = require("../studios/studio.entity");
const incomplete_controller_1 = require("./incomplete.controller");
let ClientsModule = class ClientsModule {
};
exports.ClientsModule = ClientsModule;
exports.ClientsModule = ClientsModule = __decorate([
    (0, common_1.Module)({
        controllers: [clients_controller_1.ClientsController, incomplete_controller_1.IncompleteController],
        providers: [clients_service_1.ClientsService],
        imports: [client_entity_1.Client, datasource_module_1.DatasourceModule, typeorm_1.TypeOrmModule.forFeature([client_entity_1.Client, photographer_entity_1.Photographer, studio_entity_1.Studio])],
    })
], ClientsModule);
//# sourceMappingURL=clients.module.js.map