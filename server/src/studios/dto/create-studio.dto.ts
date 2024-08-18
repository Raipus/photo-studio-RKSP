import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStudioDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Уютный камин', description: 'Название студии' })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'г. Москва, Ленинский проспект, д. 6', description: 'Расположение студии' })
    location: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Помещение с красивым уютным камином', description: 'Описание студии' })
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: '4000', description: 'Стоимость услуг за час в рублях' })
    cost: number;
}