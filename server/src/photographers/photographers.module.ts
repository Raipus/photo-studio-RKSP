import { Module } from "@nestjs/common";
import { Photographer } from "./photographer.entity";
import { PhotographersController } from "./photographers.controller";
import { PhotographersService } from "./photographers.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/user.entity";

@Module({
    controllers: [PhotographersController],
    providers: [PhotographersService],
    imports: [Photographer, TypeOrmModule.forFeature([User,Photographer])],
})

export class PhotographersModule {}