import { ApiProperty } from "@nestjs/swagger";
import { Booking } from "src/bookings/booking.entity";

export class IncompleteUserDto {
    @ApiProperty({ example: 'Алексей', description: 'Имя' })
    fullname: string;
    @ApiProperty({ example: [1, 4], description: 'ID всех бронь пользователя', type: () => Booking })
    bookings: Booking[];
}