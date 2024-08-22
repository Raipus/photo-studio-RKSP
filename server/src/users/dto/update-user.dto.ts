import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'Алексей', description: 'Имя' })
    fullname: string;

    @IsEmail()
    @IsOptional()
    @ApiProperty({ example: 'someemail@mail.ru', description: 'Почта (Логин)' })
    email: string;

    @IsPhoneNumber()
    @IsOptional()
    @ApiProperty({ example: '+7 (985) 242-52-64', description: 'Телефон (Альтернативный логин)' })
    phone: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'somepassword', description: 'Пароль' })
    password: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'user', description: 'Роль пользователя' })
    role: string;

}