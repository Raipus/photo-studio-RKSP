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
import { CreateStudioDto } from './dto/create-studio.dto';
import { StudiosService } from './studios.service';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('studios')
@ApiTags('Студии')
export class StudiosController {
  constructor(private readonly StudiosService: StudiosService) {}

  @ApiOperation({ summary: 'Получить все студии' })
  @Get()
  findAll() {
    return this.StudiosService.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Получить конкретную студию' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.StudiosService.findOne(+id);
  }

  @UseGuards(AccessTokenGuard, AdminGuard)
  @ApiOperation({ summary: 'Изменить студию' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateStudio: CreateStudioDto,
  ) {
    return this.StudiosService.update(+id, updateStudio);
  }

  @UseGuards(AccessTokenGuard, AdminGuard)
  @ApiOperation({ summary: 'Создать студию' })
  @Post()
  create(@Body() createStudio: CreateStudioDto) {
    return this.StudiosService.create(createStudio);
  }

  @UseGuards(AccessTokenGuard, AdminGuard)
  @ApiOperation({ summary: 'Удалить студию' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.StudiosService.remove(+id);
  }
}
