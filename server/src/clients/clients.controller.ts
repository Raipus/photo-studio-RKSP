import { Client } from "./client.entity";
import { ClientsService } from "./clients.service";
import { Controller, Get, Put, Param, Body, Post, Delete } from "@nestjs/common";
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateClientDto } from "./dto/create-client.dto";

@Controller('clients')
@ApiTags('Клиенты')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}

    @ApiOperation({ summary: 'Получить всех клиентов' }) 
    @Get()
    findAll(){
        return this.clientsService.findAll();
    }

    @ApiOperation({ summary: 'Получить конкретного клиента' }) 
    @Get(':id')
    findOne(@Param('id') id:string) {
        return this.clientsService.findOne(+id);
    }

    @ApiOperation({ summary: 'Изменить клиента' }) 
    @Put(':id')
    update(@Param('id') id: string, @Body() updateClient: Client) {
        return this.clientsService.update(+id,updateClient);
    }

    @ApiOperation({ summary: 'Создать клиента' }) 
    @Post()
    create(@Body() createClient: CreateClientDto) {
        return this.clientsService.create(createClient);
    }

    @ApiOperation({ summary: 'Удалить клиента' }) 
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.clientsService.remove(+id);
    }
}