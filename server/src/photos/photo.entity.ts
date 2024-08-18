import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('photo')
export class Photo {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'User', description: 'Категория фотографии для удобства (User, Photographer, Studio)' })
    @Column()
    category: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '/client/src/photos/img.png', description: 'Путь до файла' })
    @Column()
    path: string;

    @ApiProperty({ example: [1, 4], description: 'ID студии (Может быть NULL)' })
    @ManyToOne(() => Studio, studio => studio.photos, { nullable: true })
    studio: Studio;

    @ApiProperty({ example: 1, description: 'ID фотографа (Может быть NULL)' })
    @OneToOne(() => Photographer, photographer => photographer.photo, { nullable: true })
    photographer: Photographer;

    @ApiProperty({ example: 4, description: 'ID клиента (Может быть NULL)' })
    @OneToOne(() => User, user => user.photo, { nullable: true })
    user: User;
}