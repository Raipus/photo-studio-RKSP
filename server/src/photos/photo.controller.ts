import { Controller, Get, Put, Param, Body, Post, Delete, ParseIntPipe } from "@nestjs/common";
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PhotosService } from "./photo.service";
import { Photo } from "./photo.entity";
import { CreatePhotoDto } from "./dto/create-photo.dto";

@Controller('photos')
@ApiTags('Фото')
export class PhotosController {
    constructor(private readonly PhotosService: PhotosService) {}

    @ApiOperation({ summary: 'Получить все фото' }) 
    @Get()
    findAll(){
        return this.PhotosService.findAll();
    }

    @ApiOperation({ summary: 'Получить конкретное фото' }) 
    @Get(':id')
    findOne(@Param('id',ParseIntPipe) id:number) {
        return this.PhotosService.findOne(+id);
    }

    @ApiOperation({ summary: 'Изменить фото' }) 
    @Put(':id')
    update(@Param('id',ParseIntPipe) id: number, @Body() updatePhoto: Photo) {
        return this.PhotosService.update(+id,updatePhoto);
    }

    @ApiOperation({ summary: 'Создать фото' }) 
    @Post()
    create(@Body() createPhoto: CreatePhotoDto) {
        return this.PhotosService.create(createPhoto);
    }

    @ApiOperation({ summary: 'Удалить фото' }) 
    @Delete(':id')
    remove(@Param('id',ParseIntPipe) id: number){
        return this.PhotosService.remove(+id);
    }
}