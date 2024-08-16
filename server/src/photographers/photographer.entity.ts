import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('photographers')
export class Photographer {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Иванов Иван Иваныч', description: 'ФИО' })
    @Column()
    fullname: string;
    
    @IsPhoneNumber()
    @IsNotEmpty()
    @ApiProperty({ example: '+7 (985) 242-52-64', description: 'Телефон' })
    @Column()
    phone: string;
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: '4', description: 'Опыт работы, в годах' })
    @Column()
    work_exp: number;

    @ApiProperty({ example: [1, 4], description: 'Клиенты, забронировавшие фотографа' })
    @ManyToMany((type) => User, (user) => user.photographers)
    @JoinTable({
        name: 'user_photographer',
        joinColumn: {name:'photographer_id'},
        inverseJoinColumn: {name:'client_id'},
    })
    users: User[];
}