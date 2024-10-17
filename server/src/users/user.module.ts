import { forwardRef, Module } from "@nestjs/common";
import { User } from "./user.entity";
import { UsersController } from "./user.controller";
import { UsersService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
//import { Photo } from "src/photos/photo.entity";
import { Booking } from "src/bookings/booking.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { BookingsService } from "src/bookings/booking.service";
import { BookingsModule } from "src/bookings/booking.module";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        User, 
        forwardRef(() => BookingsModule),
        TypeOrmModule.forFeature([User,Photographer,Studio,Booking])
    ],
    exports: [UsersService],
})

export class UsersModule {}