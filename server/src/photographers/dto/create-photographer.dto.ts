import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class CreatePhotographerDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Иванов Иван Иваныч', description: 'ФИО' })
    fullname: string;
    
    @IsPhoneNumber()
    @IsNotEmpty()
    @ApiProperty({ example: '+7 (985) 242-52-64', description: 'Телефон' })
    phone: string;
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: '4', description: 'Опыт работы, в годах' })
    work_exp: number;
}