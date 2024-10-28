import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/bookings/booking.entity';
//import { Photo } from 'src/photos/photo.entity';
import * as argon2 from 'argon2';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreatePhotographerDto } from './dto/create-photographer.dto';
import { Photographer } from './photographer.entity';
import { UpdateTokenDto } from 'src/users/dto/update-token.dto';

@Injectable()
export class PhotographersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Photographer)
    private readonly photographerRepository: Repository<Photographer>,
    //    @InjectRepository(Photo)
    //    private readonly photoRepository: Repository<Photo>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async create(photographerNew: CreatePhotographerDto): Promise<Photographer> {
    try {
      const photographer = await this.photographerRepository.findOne({
        where: { email: photographerNew.email },
      });

      if (photographer) {
        throw new BadRequestException(
          `Фотограф с почтой ${photographerNew.email} уже существует!`,
        );
      }

      const newPhotographer = this.photographerRepository.create();
      newPhotographer.fullname = photographerNew.fullname;
      newPhotographer.email = photographerNew.email;
      newPhotographer.password = await argon2.hash(photographerNew.password);
      newPhotographer.work_exp = photographerNew.work_exp;
      newPhotographer.cost = photographerNew.cost;
      newPhotographer.role = 'photographer';
      await this.photographerRepository.save(newPhotographer);
      return newPhotographer;
    } catch (error) {
      throw error;
    }
  }

  async findOne(email: string): Promise<Photographer> {
    try {
      const photographer = await this.photographerRepository.findOne({
        where: { email },
      });

      //      if (!photographer) {
      //        throw new NotFoundException(`Фотограф с почтой ${email} не найден`);
      //      }

      return photographer;
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Photographer[]> {
    const photographers = await this.photographerRepository.find({
      order: {
        id: 'ASC',
      },
    });
    return photographers;
  }

  async update(
    id: number,
    updatedPhotographer: CreatePhotographerDto,
  ): Promise<Photographer> {
    try {
      const photographer = await this.photographerRepository.findOne({
        where: { id },
      });

      if (!photographer) {
        throw new NotFoundException(`Фотографа с id ${id} не найдено`);
      }

      photographer.fullname = updatedPhotographer.fullname;
      photographer.email = updatedPhotographer.email;
      photographer.password = await argon2.hash(updatedPhotographer.password);
      photographer.work_exp = updatedPhotographer.work_exp;
      photographer.cost = updatedPhotographer.cost;

      await this.photographerRepository.save(photographer);

      return photographer;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const photographer = await this.photographerRepository.findOne({
        where: { id },
      });

      if (!photographer) {
        throw new NotFoundException(`Фотографа с id ${id} не найдено`);
      }

      this.photographerRepository.delete({ id });
      return HttpStatus.OK;
    } catch (error) {
      throw error;
    }
  }

  async updateToken(
    id: number,
    updatedPhotographer: UpdateTokenDto,
  ): Promise<Photographer> {
    try {
      const photographer = await this.photographerRepository.findOne({
        where: { id },
      });

      if (!photographer) {
        throw new NotFoundException(`Фотограф с id ${id} не найден`);
      }

      photographer.refreshToken = updatedPhotographer.refreshToken;

      await this.photographerRepository.save(photographer);

      return photographer;
    } catch (error) {
      throw error;
    }
  }
}
