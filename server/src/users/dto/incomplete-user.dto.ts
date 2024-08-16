import { ApiProperty } from "@nestjs/swagger";

export class IncompleteUserDto {
    @ApiProperty({ example: 'Алексей', description: 'Имя' })
    fullname: string;
    @ApiProperty({ example: [1, 4], description: 'ID всех бронь пользователя' })
    bookings: Booking[];
}