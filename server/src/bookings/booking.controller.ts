import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  Post,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookingsService } from './booking.service';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { AuthorGuard } from 'src/guards/author.guard';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { Request } from 'express';

@Controller('bookings')
@ApiTags('Брони')
export class BookingsController {
  constructor(private readonly BookingsService: BookingsService) {}

  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Получить все брони' })
  @Get()
  findAll(@Req() req: Request) {
    return this.BookingsService.findAll(req.user['email'], req.user['role']);
  }

  @UseGuards(AccessTokenGuard, AuthorGuard)
  @ApiOperation({ summary: 'Получить конкретную бронь' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.BookingsService.findOne(+id);
  }

  @UseGuards(AccessTokenGuard, AuthorGuard)
  @ApiOperation({ summary: 'Изменить бронь' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBooking: CreateBookingDto,
  ) {
    return this.BookingsService.update(+id, updateBooking);
  }

  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Создать бронь' })
  @Post()
  create(@Body() createBooking: CreateBookingDto) {
    return this.BookingsService.create(createBooking);
  }

  @UseGuards(AccessTokenGuard, AuthorGuard)
  @ApiOperation({ summary: 'Удалить бронь' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.BookingsService.remove(+id);
  }
}
