import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
import { User } from "src/users/user.entity";

export class CreateBookingDto {
    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({ example: '2021-04-19', description: 'Дата брони' })
    date: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: '5', description: 'Количество людей на брони' })
    people_number: number;
    
    @ApiProperty({ example: 1, description: 'ID юзера', type: () => User })
    user: User;

    @ApiProperty({ example: 1, description: 'ID студии', type: () => Studio })
    studio: Studio;

    @ApiProperty({ example: 1, description: 'ID фотографа', type: () => Photographer })
    photographer: Photographer;
}