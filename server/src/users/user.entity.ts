import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
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
    @ApiProperty({ example: '+7 985 242 52 64', description: 'Телефон' })
    @Column()
    phone: string;

    @ApiProperty({ example: [1, 4], description: 'Студии, забронированные клиентом' })
    @ManyToMany((type) => Studio, (studio) => studio.users)
    @JoinTable({
        name: 'client_studio',
        joinColumn: {name:'client_id'},
        inverseJoinColumn: {name:'studio_id'},
    })
    studios: Studio[];

    @ApiProperty({ example: [1, 4], description: 'Фотографы, забронированные клиентом' })
    @ManyToMany((type) => Photographer, (photographer) => photographer.users)
    @JoinTable({
        name: 'client_photographer',
        joinColumn: {name:'client_id'},
        inverseJoinColumn: {name:'photographer_id'},
    })
    photographers: Photographer[];
}