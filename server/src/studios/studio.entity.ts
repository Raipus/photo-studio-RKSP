import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Client } from "src/clients/client.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @ApiProperty({ example: [1, 4], description: 'Клиенты, забронировавшие студию' })
    @ManyToMany((type) => Client, (clients) => clients.studios)
    @JoinTable({
        name: 'client_studio',
        joinColumn: {name:'studio_id'},
        inverseJoinColumn: {name:'client_id'},
    })
    clients: Client[];
}