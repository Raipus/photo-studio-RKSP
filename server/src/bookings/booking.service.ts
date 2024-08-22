import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
import { Booking } from "src/bookings/booking.entity";
import { User } from "src/users/user.entity";
import { CreateBookingDto } from "./dto/create-booking.dto";

@Injectable ()
export class BookingsService {
    constructor (
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Photographer)
        private readonly photographerRepository: Repository<Photographer>,
        @InjectRepository(Studio)
        private readonly studioRepository: Repository<Studio>,
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>
    ) {}

    async create(bookingDto: CreateBookingDto): Promise<Booking> {
        const booking = this.bookingRepository.create();

        booking.date = bookingDto.date;
        booking.people_number = bookingDto.people_number;

        if (bookingDto.user_id!=null) {
            const user = await this.userRepository.findOne({
                where: { id: bookingDto.user_id },
            });
            booking.user = user;
        }

        if (bookingDto.studio_id!=null) {
            const studio = await this.studioRepository.findOne({
                where: { id: bookingDto.studio_id },
            });
            booking.studio = studio;
        }

        if (bookingDto.photographer_id!=null) {
            const photographer = await this.photographerRepository.findOne({
                where: { id: bookingDto.photographer_id },
            });
            booking.photographer = photographer;
        }

        await this.bookingRepository.save(booking);
        return booking;
    }

    async findOne(id: number): Promise<Booking> {
        try{
            const booking = await this.bookingRepository.findOne({ where: { id } });

            if (!booking) {
                throw new NotFoundException(`Бронь с ID ${id} не найдена`);
            }
            
            return booking;
        }
        catch(error){
            throw error;
        }
    }

    async findAll(): Promise<Booking[]> {
        const bookings = await this.bookingRepository.find();
        return bookings;
    }

    async update(id: number, updatedBooking: CreateBookingDto): Promise<Booking> {
        try{
            const booking = await this.bookingRepository.findOne({
                where: { id },
                relations: {
                    user: true,
                    studio: true,
                    photographer: true
                }
            });

            if (!booking) {
                throw new NotFoundException(`Бронь с id ${id} не найдена`);
            }

            if (updatedBooking.date!=null) {
                booking.date = updatedBooking.date;
            }

            if (updatedBooking.people_number!=null) {
                booking.people_number = updatedBooking.people_number;
            }

            if (updatedBooking.user_id!=null) {
            const user = await this.userRepository.findOne({
                where: { id: updatedBooking.user_id },
            });
            booking.user = user;
            }
    
            if (updatedBooking.studio_id!=null) {
            const studio = await this.studioRepository.findOne({
                where: { id: updatedBooking.studio_id },
            });
            booking.studio = studio;
            }
    
            if (updatedBooking.photographer_id!=null) {
                const photographer = await this.photographerRepository.findOne({
                    where: { id: updatedBooking.photographer_id },
                });
                booking.photographer = photographer;
            }

            await this.bookingRepository.save(booking);

            return booking;
        }
        catch(error){
            throw error;
        }
    }

    async remove(id: number) {
        try{
            const booking = await this.bookingRepository.findOne({
                where: { id }
            });

            if (!booking) {
                throw new NotFoundException(`Бронь с id ${id} не найдена`);
            }

            this.bookingRepository.delete({id});
            return HttpStatus.OK;
        }
        catch(error){
            throw error;
        }
    }
}