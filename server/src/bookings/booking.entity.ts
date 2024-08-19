import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('bookings')
export class Booking {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @PrimaryGeneratedColumn()
    id: number;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({ example: '2021-04-19', description: 'Дата брони' })
    @Column()
    date: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: '5', description: 'Количество людей на брони' })
    @Column()
    people_number: number;
    
    @ApiProperty({ example: '1', description: 'ID юзера', type: () => User })
    @ManyToOne(() => User, user => user.bookings)
    user: User;

    @ApiProperty({ example: '1', description: 'ID студии', type: () => Studio })
    @ManyToOne(() => Studio, studio => studio.bookings)
    studio: Studio;

    @ApiProperty({ example: '1', description: 'ID фотографа', type: () => Photographer })
    @ManyToOne(() => Photographer, photographer => photographer.bookings)
    photographer: Photographer;
}