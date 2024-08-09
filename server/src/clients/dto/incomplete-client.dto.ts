import { ApiProperty } from "@nestjs/swagger";

export class IncompleteClientDto {
    @ApiProperty({ example: 'Иванов Михаил Иваныч', description: 'ФИО' })
    fullname: string;
    @ApiProperty({ example: [1, 4], description: 'Студии, забронированные клиентом' })
    studios: number[];
}