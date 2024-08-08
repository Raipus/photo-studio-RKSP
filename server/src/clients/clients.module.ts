import { Module } from "@nestjs/common";
import { Client } from "./client.entity";
import { ClientsController } from "./clients.controller";
import { ClientsService } from "./clients.service";
import { DatasourceModule } from "src/datasource/datasource.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
import { IncompleteController } from "./incomplete.controller";

@Module({
    controllers: [ClientsController],
    providers: [ClientsService],
    imports: [Client, DatasourceModule, TypeOrmModule.forFeature([Client,Photographer,Studio])],
})

export class ClientsModule {}