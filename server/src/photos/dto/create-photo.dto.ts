import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
import { User } from "src/users/user.entity";

export class CreatePhotoDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'User', description: 'Категория фотографии для удобства (User, Photographer, Studio)' })
    category: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '/client/src/photos/img.png', description: 'Путь до файла' })
    path: string;

    @ApiProperty({ example: [1, 4], description: 'ID студии (Может быть NULL)', type: () => Studio })
    studio: Studio;

    @ApiProperty({ example: 1, description: 'ID фотографа (Может быть NULL)', type: () => Photographer })
    photographer: Photographer;

    @ApiProperty({ example: 4, description: 'ID клиента (Может быть NULL)', type: () => User })
    user: User;
}