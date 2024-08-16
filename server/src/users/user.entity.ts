import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
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
    @ApiProperty({ example: 'user', description: 'Роль пользователя' })
    @Column()
    role: string;

    @ApiProperty({ example: 3, description: 'ID фото пользователя' })
    @OneToOne((type) => Photo, photo => photo.user, { nullable: true })
    photo: Photo;

    @ApiProperty({ example: [1, 4], description: 'ID всех бронь пользователя' })
    @OneToMany(() => Booking, bookings => bookings.user)
    bookings: Booking[];
}