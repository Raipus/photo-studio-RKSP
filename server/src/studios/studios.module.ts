import { Module } from "@nestjs/common";
import { Studio } from "./studio.entity";
import { StudiosController } from "./studios.controller";
import { StudiosService } from "./studios.service";
import { DatasourceModule } from "src/datasource/datasource.module";
import { Client } from "src/clients/client.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    controllers: [StudiosController],
    providers: [StudiosService],
    imports: [Studio, DatasourceModule,TypeOrmModule.forFeature([Client,Studio])],
})

export class StudiosModule {}