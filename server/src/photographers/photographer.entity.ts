import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { Booking } from "src/bookings/bookings.entity";
import { Photo } from "src/photos/photo.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('photographers')
export class Photographer {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @PrimaryGeneratedColumn()
    id: number;
    
    @IsString()
    @ApiProperty({ example: 'Алексей', description: 'Имя' })
    @Column()
    fullname: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'someemail@mail.ru', description: 'Почта (Логин)' })
    @Column()
    email: string;

    @IsPhoneNumber()
    @ApiProperty({ example: '+7 (985) 242-52-64', description: 'Телефон (Альтернативный логин)' })
    @Column()
    phone: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'somepassword', description: 'Пароль' })
    @Column()
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'photographer', description: 'Роль пользователя' })
    @Column()
    role: string;

    @IsNumber()
    @ApiProperty({ example: '4', description: 'Опыт работы, в годах' })
    @Column()
    work_exp: number;

    @IsNumber()
    @ApiProperty({ example: '1600', description: 'Стоимость услуг за час в рублях' })
    @Column()
    cost: number;

    @ApiProperty({ example: 3, description: 'ID фото фотографа' })
    @OneToOne((type) => Photo, photo => photo.photographer, { nullable: true })
    photo: Photo;

    @ApiProperty({ example: [1, 4], description: 'ID всех бронь, где заказаны услуги данного фотографа' })
    @OneToMany(() => Booking, bookings => bookings.photographer)
    bookings: Booking[];
}