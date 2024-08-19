import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { IncompleteUserDto } from "./dto/incomplete-user.dto";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
import { Photo } from "src/photos/photo.entity";
import { Booking } from "src/bookings/booking.entity";

@Injectable ()
export class UsersService {
    constructor (
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Photographer)
        private readonly photographerRepository: Repository<Photographer>,
        @InjectRepository(Studio)
        private readonly studioRepository: Repository<Studio>,
        @InjectRepository(Photo)
        private readonly photoRepository: Repository<Photo>,
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>
    ) {}

    async create(userDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create();
        user.email = userDto.email;
        user.password = userDto.password;
        await this.userRepository.save(user);
        return user;
    }

    async findOne(email: string): Promise<User> {
        try{
            const user = await this.userRepository.findOne({ where: { email } });

            if (!user) {
                throw new NotFoundException(`Клиент с почтой ${email} не найден`);
            }
            
            return user;
        }
        catch(error){
            throw error;
        }
    }

    async findAll(): Promise<User[]> {
        const users = await this.userRepository.find();
        return users;
    }

    async findIncomplete(): Promise<IncompleteUserDto[]> {
        const users = await this.userRepository.find({
            relations: {
                photo: true,
                bookings: true
            }
        });
        const incompleteUsers: IncompleteUserDto[] = users.map((user) => {
            const incompleteUser = new IncompleteUserDto();
            incompleteUser.fullname = user.fullname;
            incompleteUser.bookings = user.bookings.map((booking) => booking);
            return incompleteUser;
        });
        return incompleteUsers;
    }

    async update(id: number, updatedUser: User): Promise<User> {
        try{
            const user = await this.userRepository.findOne({
                where: { id },
                relations: {
                    photo: true,
                    bookings: true
                }
            });

            if (!user) {
                throw new NotFoundException(`Клиент с id ${id} не найден`);
            }

            user.fullname = updatedUser.fullname;
            user.email = updatedUser.email;
            user.phone = updatedUser.phone;
            user.password = updatedUser.password;
            user.role = updatedUser.role;

            if (updatedUser.bookings!=null) {
                const bookings = await this.bookingRepository.findBy({
                    id: In(updatedUser.bookings),
                });
                user.bookings = bookings;
            }
            
            if (updatedUser.photo!=null) {
                const photo = await this.photoRepository.findOne({
                    where: { id: updatedUser.photo.id },
                });
                user.photo = photo;
            }
            
            await this.userRepository.save(user);

            return user;
        }
        catch(error){
            throw error;
        }
        
        

        
    }

    async remove(id: number) {
        try{
            const user = await this.userRepository.findOne({
                where: { id }
            });

            if (!user) {
                throw new NotFoundException(`Клиент с id ${id} не найден`);
            }

            this.userRepository.delete({id});
            return HttpStatus.OK;
        }
        catch(error){
            throw error;
        }
    }
}