import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @ApiProperty({ example: 'Барышкин Антон Владимирович', description: 'Фамилия Имя Отчество' })
    fullname: string;
    
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'someemail@mail.ru', description: 'Почта (Логин)' })
    email: string;

    @IsPhoneNumber()
    @ApiProperty({ example: '+7 (985) 242-52-64', description: 'Телефон' })
    phone: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'somepassword', description: 'Пароль' })
    password: string;
}