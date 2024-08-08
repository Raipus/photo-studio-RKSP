import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class IncompleteClientDto {
    @IsString()
    @ApiProperty({ example: 'Иванов Михаил Иваныч', description: 'ФИО' })
    fullname: string;
    @ApiProperty({ example: [1, 4], description: 'Студии, забронированные клиентом' })
    studios: number[];
}