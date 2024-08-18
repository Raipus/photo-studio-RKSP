import { Module } from "@nestjs/common";
import { User } from "./user.entity";
import { UsersController } from "./user.controller";
import { UsersService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
import { Photo } from "src/photos/photo.entity";
import { Booking } from "src/bookings/bookings.entity";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [User, TypeOrmModule.forFeature([User,Photographer,Studio,Photo,Booking])],
})

export class UsersModule {}