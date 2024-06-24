import { Photographer } from "./photographer.entity";
import { PhotographersService } from "./photographers.service";
import { Controller, Get, Put, Param, Body, Post, Delete } from "@nestjs/common";
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('Photographers')
@ApiTags('Фотографы')
export class PhotographersController {
    constructor(private readonly PhotographersService: PhotographersService) {}

    @ApiOperation({ summary: 'Получить всех фотографов' }) 
    @Get()
    findAll(){
        return this.PhotographersService.findAll();
    }

    @ApiOperation({ summary: 'Получить конкретного фотографа' }) 
    @Get(':id')
    findOne(@Param('id') id:string) {
        return this.PhotographersService.findOne(+id);
    }

    @ApiOperation({ summary: 'Изменить фотографа' }) 
    @Put(':id')
    update(@Param('id') id: string, @Body() updatePhotographer: Photographer) {
        return this.PhotographersService.update(+id,updatePhotographer);
    }

    @ApiOperation({ summary: 'Создать фотографа' }) 
    @Post()
    create(@Body() createPhotographer: Photographer) {
        return this.PhotographersService.create(createPhotographer);
    }

    @ApiOperation({ summary: 'Удалить фотографа' }) 
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.PhotographersService.remove(+id);
    }
}