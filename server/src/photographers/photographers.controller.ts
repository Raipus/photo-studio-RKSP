import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
//import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePhotographerDto } from './dto/create-photographer.dto';
import { PhotographersService } from './photographers.service';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';

@Controller('photographers')
@ApiTags('Фотографы')
export class PhotographersController {
  constructor(private readonly PhotographersService: PhotographersService) {}

  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Получить всех фотографов' })
  @Get()
  findAll() {
    return this.PhotographersService.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Получить конкретного фотографа' })
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.PhotographersService.findOne(email);
  }

  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Изменить фотографа' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updatePhotographer: CreatePhotographerDto,
  ) {
    return this.PhotographersService.update(+id, updatePhotographer);
  }

  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Создать фотографа' })
  @Post()
  create(@Body() createPhotographer: CreatePhotographerDto) {
    return this.PhotographersService.create(createPhotographer);
  }

  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Удалить фотографа' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.PhotographersService.remove(+id);
  }
}
