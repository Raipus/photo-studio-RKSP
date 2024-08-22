import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateBookingDto {
    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({ example: '2021-04-19', description: 'Дата брони' })
    date: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: '5', description: 'Количество людей на брони' })
    people_number: number;
    
    @ApiProperty({ example: 1, description: 'ID юзера' })
    user_id: number;

    @ApiProperty({ example: 1, description: 'ID студии' })
    studio_id: number;

    @ApiProperty({ example: 1, description: 'ID фотографа' })
    photographer_id: number;
}