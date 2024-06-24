import { ApiProperty } from "@nestjs/swagger";

export class CreateClientDto {
    @ApiProperty({ example: 'Иванов Михаил Иваныч', description: 'ФИО' })
    fullname: string;
    @ApiProperty({ example: '+7 985 242 24 64', description: 'Телефон' })
    phone: string;
}