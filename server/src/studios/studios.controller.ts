import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateStudioDto } from "./dto/create-studio.dto";
import { Studio } from "./studio.entity";
import { StudiosService } from "./studios.service";
import { Controller, Get, Put, Param, Body, Post, Delete, ParseIntPipe, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('studios')
@ApiTags('Студии')
export class StudiosController {
    constructor(private readonly StudiosService: StudiosService) {}

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Получить все студии' }) 
    @Get()
    findAll(){
        return this.StudiosService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Получить конкретную студию' }) 
    @Get(':id')
    findOne(@Param('id',ParseIntPipe) id:string) {
        return this.StudiosService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Изменить студию' }) 
    @Put(':id')
    update(@Param('id',ParseIntPipe) id: string, @Body() updateStudio: CreateStudioDto) {
        return this.StudiosService.update(+id,updateStudio);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Создать студию' }) 
    @Post()
    create(@Body() createStudio: CreateStudioDto) {
        return this.StudiosService.create(createStudio);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Удалить студию' }) 
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: string){
        return this.StudiosService.remove(+id);
    }
}