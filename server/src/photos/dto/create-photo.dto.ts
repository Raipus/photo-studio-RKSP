import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePhotoDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'User', description: 'Категория фотографии для удобства (User, Photographer, Studio)' })
    category: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '/client/src/photos/img.png', description: 'Путь до файла' })
    path: string;
}