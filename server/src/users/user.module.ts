import { Module } from "@nestjs/common";
import { User } from "./user.entity";
import { UsersController } from "./user.controller";
import { UsersService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
import { Photo } from "src/photos/photo.entity";
import { Booking } from "src/bookings/booking.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        User, 
        TypeOrmModule.forFeature([User,Photographer,Studio,Photo,Booking]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: '30d' },
            }),
            inject: [ConfigService],
        })],
    exports: [UsersService],
})

export class UsersModule {}