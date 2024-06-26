import { Studio } from "./studio.entity";
import { StudiosService } from "./studios.service";
import { Controller, Get, Put, Param, Body, Post, Delete } from "@nestjs/common";
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('Studios')
@ApiTags('Студии')
export class StudiosController {
    constructor(private readonly StudiosService: StudiosService) {}

    @ApiOperation({ summary: 'Получить все студии' }) 
    @Get()
    findAll(){
        return this.StudiosService.findAll();
    }

    @ApiOperation({ summary: 'Получить конкретную студию' }) 
    @Get(':id')
    findOne(@Param('id') id:string) {
        return this.StudiosService.findOne(+id);
    }

    @ApiOperation({ summary: 'Изменить студию' }) 
    @Put(':id')
    update(@Param('id') id: string, @Body() updateStudio: Studio) {
        return this.StudiosService.update(+id,updateStudio);
    }

    @ApiOperation({ summary: 'Создать студию' }) 
    @Post()
    create(@Body() createStudio: Studio) {
        return this.StudiosService.create(createStudio);
    }

    @ApiOperation({ summary: 'Удалить студию' }) 
    @Delete(':id')
    remove(@Param('id') id: string){
        return this.StudiosService.remove(+id);
    }
}