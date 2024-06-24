import { ApiProperty } from "@nestjs/swagger";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('clients')
export class Client {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @PrimaryGeneratedColumn()
    id: number;
    
    @ApiProperty({ example: 'Иванов Иван Иваныч', description: 'ФИО' })
    @Column()
    fullname: string;

    @ApiProperty({ example: '+7 985 242 52 64', description: 'Телефон' })
    @Column()
    phone: string;

    @ApiProperty({ example: [1, 4], description: 'Студии, забронированные клиентом' })
    @ManyToMany((type) => Studio, (studio) => studio.clients)
    @JoinTable({
        name: 'client_studio',
        joinColumn: {name:'client_id'},
        inverseJoinColumn: {name:'studio_id'},
    })
    studios: Studio[];

    @ApiProperty({ example: [1, 4], description: 'Фотографы, забронированные клиентом' })
    @ManyToMany((type) => Photographer, (photographer) => photographer.clients)
    @JoinTable({
        name: 'client_photographer',
        joinColumn: {name:'client_id'},
        inverseJoinColumn: {name:'photographer_id'},
    })
    photographers: Photographer[];
}