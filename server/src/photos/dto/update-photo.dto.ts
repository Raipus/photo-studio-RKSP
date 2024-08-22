import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdatePhotoDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'User', description: 'Категория фотографии для удобства (User, Photographer, Studio)' })
    category: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '/client/src/photos/img.png', description: 'Путь до файла' })
    path: string;

    @ApiProperty({ example: [1, 4], description: 'ID студии (Может быть NULL)' })
    studio_id: number;

    @ApiProperty({ example: 1, description: 'ID фотографа (Может быть NULL)' })
    photographer_id: number;

    @ApiProperty({ example: 4, description: 'ID клиента (Может быть NULL)' })
    user_id: number;
}