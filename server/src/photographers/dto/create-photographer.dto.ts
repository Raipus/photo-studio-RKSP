import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreatePhotographerDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'someemail@mail.ru', description: 'Почта (Логин)' })
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'somepassword', description: 'Пароль' })
    password: string;
}