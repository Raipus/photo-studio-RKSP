import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
//import { Photo } from "src/photos/photo.entity";
import { Booking } from "src/bookings/booking.entity";
import { User } from "src/users/user.entity";
import { BookingsService } from "./booking.service";
import { BookingsController } from "./booking.controller";
import { UsersModule } from "src/users/user.module";
import { PhotographersModule } from "src/photographers/photographers.module";
//import { PhotosModule } from "src/photos/photo.module";
//import { PhotosService } from "src/photos/photo.service";

@Module({
    controllers: [BookingsController],
    providers: [BookingsService],
    imports: [User, forwardRef(() => UsersModule), PhotographersModule, TypeOrmModule.forFeature([User,Photographer,Studio,Booking])],
    exports: [BookingsService],
})

export class BookingsModule {}