import { forwardRef } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, MinLength } from "class-validator";
import { Booking } from "src/bookings/booking.entity";
import { Photo } from "src/photos/photo.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('photographers')
export class Photographer {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @PrimaryGeneratedColumn()
    id: number;
    
    @IsString()
    @IsNotEmpty()
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
    @Column({ nullable: true })
    phone: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'Пароль должен быть минимум 6 символов!' } )
    @ApiProperty({ example: 'somepassword', description: 'Пароль' })
    @Column()
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'photographer', description: 'Роль пользователя' })
    @Column({ nullable: true })
    role: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: '4', description: 'Опыт работы, в годах' })
    @Column()
    work_exp: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: '1600', description: 'Стоимость услуг за час в рублях' })
    @Column()
    cost: number;

    @ApiProperty({ example: '3', description: 'ID фото фотографа', type: () => Photo })
    @OneToOne(() => Photo, { nullable: true })
    @JoinColumn()
    photo: Photo;

    @ApiProperty({ example: [1, 4], description: 'ID всех бронь, где заказаны услуги данного фотографа', type: () => Booking })
    @OneToMany(() => Booking, bookings => bookings.photographer)
    bookings: Booking[];
}