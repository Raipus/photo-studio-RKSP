import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
import { Photo } from "src/photos/photo.entity";
import { Booking } from "src/bookings/booking.entity";
import { User } from "src/users/user.entity";
import { PhotosService } from "./photo.service";
import { PhotosController } from "./photo.controller";

@Module({
    controllers: [PhotosController],
    providers: [PhotosService],
    imports: [User, TypeOrmModule.forFeature([User,Photographer,Studio,Photo,Booking])],
})

export class PhotosModule {}