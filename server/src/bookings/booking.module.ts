import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
import { Photo } from "src/photos/photo.entity";
import { Booking } from "src/bookings/booking.entity";
import { User } from "src/users/user.entity";
import { BookingsService } from "./booking.service";
import { BookingsController } from "./booking.controller";
import { PhotosModule } from "src/photos/photo.module";
import { PhotosService } from "src/photos/photo.service";

@Module({
    controllers: [BookingsController],
    providers: [BookingsService, PhotosService],
    imports: [User, TypeOrmModule.forFeature([User,Photographer,Studio,Photo,Booking])],
    exports: [BookingsService],
})

export class BookingsModule {}