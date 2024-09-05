import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreatePhotographerDto } from "./dto/create-photographer.dto";
import { Photographer } from "./photographer.entity";
import { PhotographersService } from "./photographers.service";
import { Controller, Get, Put, Param, Body, Post, Delete, ParseIntPipe, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('photographers')
@ApiTags('Фотографы')
export class PhotographersController {
    constructor(private readonly PhotographersService: PhotographersService) {}

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Получить всех фотографов' }) 
    @Get()
    findAll(){
        return this.PhotographersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Получить конкретного фотографа' }) 
    @Get(':email')
    findOne(@Param('email') email:string) {
        return this.PhotographersService.findOne(email);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Изменить фотографа' }) 
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: string, @Body() updatePhotographer: CreatePhotographerDto) {
        return this.PhotographersService.update(+id,updatePhotographer);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Создать фотографа' }) 
    @Post()
    create(@Body() createPhotographer: CreatePhotographerDto) {
        return this.PhotographersService.create(createPhotographer);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Удалить фотографа' }) 
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: string){
        return this.PhotographersService.remove(+id);
    }
}