import { Controller, Get, Put, Param, Body, Post, Delete, ParseIntPipe, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookingsService } from "./booking.service";
import { Booking } from "./booking.entity";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { AuthorGuard } from "src/auth/author.guard";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('bookings')
@ApiTags('Брони')
export class BookingsController {
    constructor(private readonly BookingsService: BookingsService) {}

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Получить все брони' }) 
    @Get()
    findAll(){
        return this.BookingsService.findAll();
    }

    @UseGuards(JwtAuthGuard, AuthorGuard)
    @ApiOperation({ summary: 'Получить конкретную бронь' }) 
    @Get(':id')
    findOne(@Param('id',ParseIntPipe) id:number) {
        return this.BookingsService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard, AuthorGuard)
    @ApiOperation({ summary: 'Изменить бронь' }) 
    @Put(':id')
    update(@Param('id',ParseIntPipe) id: number, @Body() updateBooking: CreateBookingDto) {
        return this.BookingsService.update(+id,updateBooking);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Создать бронь' }) 
    @Post()
    create(@Body() createBooking: CreateBookingDto) {
        return this.BookingsService.create(createBooking);
    }

    @UseGuards(JwtAuthGuard, AuthorGuard)
    @ApiOperation({ summary: 'Удалить бронь' }) 
    @Delete(':id')
    remove(@Param('id',ParseIntPipe) id: number){
        return this.BookingsService.remove(+id);
    }
}