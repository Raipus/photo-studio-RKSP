import { Controller, Get, Put, Param, Body, Post, Delete, ParseIntPipe } from "@nestjs/common";
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookingsService } from "./booking.service";
import { Booking } from "./booking.entity";
import { CreateBookingDto } from "./dto/create-booking.dto";

@Controller('bookings')
@ApiTags('Брони')
export class BookingsController {
    constructor(private readonly BookingsService: BookingsService) {}

    @ApiOperation({ summary: 'Получить все брони' }) 
    @Get()
    findAll(){
        return this.BookingsService.findAll();
    }

    @ApiOperation({ summary: 'Получить конкретную бронь' }) 
    @Get(':id')
    findOne(@Param('id',ParseIntPipe) id:number) {
        return this.BookingsService.findOne(+id);
    }

    @ApiOperation({ summary: 'Изменить бронь' }) 
    @Put(':id')
    update(@Param('id',ParseIntPipe) id: number, @Body() updateBooking: Booking) {
        return this.BookingsService.update(+id,updateBooking);
    }

    @ApiOperation({ summary: 'Создать бронь' }) 
    @Post()
    create(@Body() createBooking: CreateBookingDto) {
        return this.BookingsService.create(createBooking);
    }

    @ApiOperation({ summary: 'Удалить бронь' }) 
    @Delete(':id')
    remove(@Param('id',ParseIntPipe) id: number){
        return this.BookingsService.remove(+id);
    }
}