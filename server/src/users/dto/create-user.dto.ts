import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Иванов Михаил Иваныч', description: 'ФИО' })
    fullname: string;
    
    @IsPhoneNumber()
    @IsNotEmpty()
    @ApiProperty({ example: '+7 (800) 242-24-64', description: 'Телефон' })
    phone: string;
}