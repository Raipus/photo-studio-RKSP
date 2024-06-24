import { ApiProperty } from "@nestjs/swagger";
import { Client } from "src/clients/client.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('studios')
export class Studio {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Уютный камин', description: 'Название студии' })
    @Column()
    name: string;

    @ApiProperty({ example: 'г. Москва, Ленинский проспект, д. 6', description: 'Расположение студии' })
    @Column()
    location: string;
    
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