import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Photographer } from 'src/photographers/photographer.entity';
import { Studio } from 'src/studios/studio.entity';
import { Booking } from 'src/bookings/booking.entity';
import { User } from 'src/users/user.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UsersService } from 'src/users/user.service';
import { PhotographersService } from 'src/photographers/photographers.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Photographer)
    private readonly photographerRepository: Repository<Photographer>,
    @InjectRepository(Studio)
    private readonly studioRepository: Repository<Studio>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    private usersService: UsersService,
    private photographersService: PhotographersService,
  ) {}

  async create(bookingDto: CreateBookingDto): Promise<Booking> {
    const booking = this.bookingRepository.create();

    booking.date = bookingDto.date;
    booking.people_number = bookingDto.people_number;
    console.log(bookingDto.user_id);
    if (bookingDto.user_id != null) {
      const user = await this.userRepository.findOne({
        where: { id: bookingDto.user_id },
      });
      if (!user) {
        throw new NotFoundException(
          `Пользователь с id ${bookingDto.user_id} не найден!`,
        );
      }
      booking.user = user;
    }

    if (bookingDto.studio_id != null) {
      const studio = await this.studioRepository.findOne({
        where: { id: bookingDto.studio_id },
      });
      if (!studio) {
        throw new NotFoundException(
          `Студия с id ${bookingDto.studio_id} не найдена!`,
        );
      }
      booking.studio = studio;
    }

    if (bookingDto.photographer_id != null) {
      const photographer = await this.photographerRepository.findOne({
        where: { id: bookingDto.photographer_id },
      });
      if (!photographer) {
        throw new NotFoundException(
          `Фотограф с id ${bookingDto.photographer_id} не найден!`,
        );
      }
      booking.photographer = photographer;
    }

    await this.bookingRepository.save(booking);
    return booking;
  }

  async findOne(id: number): Promise<Booking> {
    try {
      const booking = await this.bookingRepository.findOne({
        where: { id },
        relations: {
          user: true,
          studio: true,
          photographer: true,
        },
      });

      if (!booking) {
        throw new NotFoundException(`Бронь с ID ${id} не найдена`);
      }

      return booking;
    } catch (error) {
      throw error;
    }
  }

  async findAll(email: string, role: string): Promise<Booking[]> {
    if (role == 'admin') {
      const bookings = await this.bookingRepository.find({
        relations: {
          user: true,
          studio: true,
          photographer: true,
        },
      });
      if (!bookings) {
        throw new NotFoundException(`Брони от почты ${email} не найдены`);
      }
      return bookings;
    } else if (role == 'user') {
      const user = await this.usersService.findOne(email);
      if (!user) {
        throw new NotFoundException(`Пользователь с почтой ${email} не найден`);
      }
      const bookings = await this.bookingRepository.find({
        relations: {
          user: true,
          studio: true,
          photographer: true,
        },
        where: {
          user: user,
        },
      });
      return bookings;
    } else if (role == 'photographer') {
      const photographer = await this.photographersService.findOne(email);
      if (!photographer) {
        throw new NotFoundException(`Фотограф с почтой ${email} не найден`);
      }
      const bookings = await this.bookingRepository.find({
        relations: {
          user: true,
          studio: true,
          photographer: true,
        },
        where: {
          photographer: photographer,
        },
      });
      return bookings;
    } else {
      throw new BadRequestException('Что-то пошло не так!');
    }
  }

  async update(id: number, updatedBooking: CreateBookingDto): Promise<Booking> {
    try {
      const booking = await this.bookingRepository.findOne({
        where: { id },
        relations: {
          user: true,
          studio: true,
          photographer: true,
        },
      });

      if (!booking) {
        throw new NotFoundException(`Бронь с id ${id} не найдена`);
      }

      if (updatedBooking.date != null) {
        booking.date = updatedBooking.date;
      }

      if (updatedBooking.people_number != null) {
        booking.people_number = updatedBooking.people_number;
      }

      if (updatedBooking.user_id != null) {
        const user = await this.userRepository.findOne({
          where: { id: updatedBooking.user_id },
        });
        if (!user) {
          throw new NotFoundException(
            `Пользователь с id ${updatedBooking.user_id} не найден!`,
          );
        }
        booking.user = user;
      }

      if (updatedBooking.studio_id != null) {
        const studio = await this.studioRepository.findOne({
          where: { id: updatedBooking.studio_id },
        });
        if (!studio) {
          throw new NotFoundException(
            `Студия с id ${updatedBooking.studio_id} не найдена!`,
          );
        }
        booking.studio = studio;
      }

      if (updatedBooking.photographer_id != null) {
        const photographer = await this.photographerRepository.findOne({
          where: { id: updatedBooking.photographer_id },
        });
        if (!photographer) {
          throw new NotFoundException(
            `Фотограф с id ${updatedBooking.photographer_id} не найден!`,
          );
        }
        booking.photographer = photographer;
      }

      await this.bookingRepository.save(booking);

      return booking;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const booking = await this.bookingRepository.findOne({
        where: { id },
      });

      if (!booking) {
        throw new NotFoundException(`Бронь с id ${id} не найдена`);
      }

      this.bookingRepository.delete({ id });
      return HttpStatus.OK;
    } catch (error) {
      throw error;
    }
  }
}
