import { Module } from "@nestjs/common";
import { Photographer } from "./photographer.entity";
import { PhotographersController } from "./photographers.controller";
import { PhotographersService } from "./photographers.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Client } from "src/clients/client.entity";

@Module({
    controllers: [PhotographersController],
    providers: [PhotographersService],
    imports: [Photographer, TypeOrmModule.forFeature([Client,Photographer])],
})

export class PhotographersModule {}