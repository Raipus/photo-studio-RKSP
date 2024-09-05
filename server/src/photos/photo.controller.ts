import { Controller, Get, Put, Param, Body, Post, Delete, ParseIntPipe, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PhotosService } from "./photo.service";
import { Photo } from "./photo.entity";
import { CreatePhotoDto } from "./dto/create-photo.dto";
import { UpdatePhotoDto } from "./dto/update-photo.dto";
import { AuthorGuard } from "src/auth/author.guard";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('photos')
@ApiTags('Фото')
export class PhotosController {
    constructor(private readonly PhotosService: PhotosService) {}

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Получить все фото' }) 
    @Get()
    findAll(){
        return this.PhotosService.findAll();
    }

    @UseGuards(JwtAuthGuard, AuthorGuard)
    @ApiOperation({ summary: 'Получить конкретное фото' }) 
    @Get(':id')
    findOne(@Param('id',ParseIntPipe) id:number) {
        return this.PhotosService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard, AuthorGuard)
    @ApiOperation({ summary: 'Изменить фото' }) 
    @Put(':id')
    update(@Param('id',ParseIntPipe) id: number, @Body() updatePhoto: UpdatePhotoDto) {
        return this.PhotosService.update(+id,updatePhoto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Создать фото' }) 
    @Post()
    create(@Body() createPhoto: CreatePhotoDto) {
        return this.PhotosService.create(createPhoto);
    }

    @UseGuards(JwtAuthGuard, AuthorGuard)
    @ApiOperation({ summary: 'Удалить фото' }) 
    @Delete(':id')
    remove(@Param('id',ParseIntPipe) id: number){
        return this.PhotosService.remove(+id);
    }
}