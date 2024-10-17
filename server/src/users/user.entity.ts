import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, MinLength } from "class-validator";
import { Booking } from "src/bookings/booking.entity";
//import { Photo } from "src/photos/photo.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @PrimaryGeneratedColumn()
    id: number;
    
    @IsString()
    @ApiProperty({ example: 'Алексей', description: 'Имя' })
    @Column({ nullable: true })
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
    @ApiProperty({ example: 'user/admin', description: 'Роль пользователя' })
    @Column({ nullable: true })
    role: string;

    @ApiProperty({ example: '', description: 'Токен - не требуется указывать' })
    @Column({ nullable: true })
    refreshToken: string;

//    @ApiProperty({ example: '3', description: 'ID фото пользователя', type: () => Photo })
//    @OneToOne(() => Photo, { nullable: true })
//    @JoinColumn()
//    photo: Photo;

    @ApiProperty({ example: [1, 4], description: 'ID всех бронь пользователя', type: () => Booking })
    @OneToMany(() => Booking, bookings => bookings.user)
    bookings: Booking[];
}