import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Booking } from "src/bookings/bookings.entity";
import { Photo } from "src/photos/photo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('studios')
export class Studio {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Уютный камин', description: 'Название студии' })
    @Column()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'г. Москва, Ленинский проспект, д. 6', description: 'Расположение студии' })
    @Column()
    location: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Помещение с красивым уютным камином', description: 'Описание студии' })
    @Column()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: '4000', description: 'Стоимость услуг за час в рублях' })
    @Column()
    cost: number;

    @ApiProperty({ example: 3, description: 'ID фото студий' })
    @OneToMany((type) => Photo, photo => photo.studio, { nullable: true })
    photos: Photo[];

    @ApiProperty({ example: [1, 4], description: 'ID всех бронь, где заказаны услуги данной студии' })
    @OneToMany((type) => Booking, bookings => bookings.studio)
    bookings: Booking[];
}