import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePhotographerDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Алексей', description: 'Имя' })
    fullname: string;
    
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'someemail@mail.ru', description: 'Почта (Логин)' })
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'somepassword', description: 'Пароль' })
    password: string;

    @IsNumber()
    @ApiProperty({ example: '4', description: 'Опыт работы, в годах' })
    work_exp: number;

    @IsNumber()
    @ApiProperty({ example: '1600', description: 'Стоимость услуг за час в рублях' })
    cost: number;
}