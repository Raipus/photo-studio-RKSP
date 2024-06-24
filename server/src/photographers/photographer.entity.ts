import { ApiProperty } from "@nestjs/swagger";
import { Client } from "src/clients/client.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('photographers')
export class Photographer {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Иванов Иван Иваныч', description: 'ФИО' })
    @Column()
    fullname: string;
    
    @ApiProperty({ example: '+7 985 242 52 64', description: 'Телефон' })
    @Column()
    phone: string;
    
    @ApiProperty({ example: '4', description: 'Опыт работы, в годах' })
    @Column()
    work_exp: number;

    @ApiProperty({ example: [1, 4], description: 'Клиенты, забронировавшие фотографа' })
    @ManyToMany((type) => Client, (client) => client.photographers)
    @JoinTable({
        name: 'client_photographer',
        joinColumn: {name:'photographer_id'},
        inverseJoinColumn: {name:'client_id'},
    })
    clients: Client[];
}