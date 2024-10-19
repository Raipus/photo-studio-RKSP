import { BadRequestException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { IncompleteUserDto } from "./dto/incomplete-user.dto";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
//import { Photo } from "src/photos/photo.entity";
import { Booking } from "src/bookings/booking.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";
import { UpdateTokenDto } from "./dto/update-token.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";

@Injectable ()
export class UsersService {
    constructor (
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Photographer)
        private readonly photographerRepository: Repository<Photographer>,
        @InjectRepository(Studio)
        private readonly studioRepository: Repository<Studio>,
//        @InjectRepository(Photo)
//        private readonly photoRepository: Repository<Photo>,
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
    ) {}

    async create(userDto: CreateUserDto) {
        try{
            const user = await this.userRepository.findOne({ where: { email: userDto.email } });

            if (user) {
                throw new BadRequestException(`Клиент с почтой ${userDto.email} уже существует!`);
            }

            const newUser = this.userRepository.create();
            newUser.fullname = userDto.fullname;
            newUser.email = userDto.email;
            newUser.phone = userDto.phone;
            newUser.password = userDto.password;
            newUser.role = "user";
            await this.userRepository.save(newUser);

            return newUser;
        }
        catch(error){
            throw error;
        }
    }

    async findOne(email: string): Promise<User> {
        try{
            const user = await this.userRepository.findOne({ where: { email } });

//            if (!user) {
//                throw new NotFoundException(`Пользователь с почтой ${email} не найден`);
//            }
            
            return user;
        }
        catch(error){
            throw error;
        }
    }

    async findOneId(id: number): Promise<User> {
        try{
            const user = await this.userRepository.findOne({ where: { id } });

            if (!user) {
                throw new NotFoundException(`Пользователь с id ${id} не найден`);
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

    async update(id: number, updatedUser: UpdateUserDto): Promise<User> {
        try{
            const user = await this.userRepository.findOne({
                where: { id }
            });

            if (!user) {
                throw new NotFoundException(`Клиент с id ${id} не найден`);
            }

            if (updatedUser.fullname!=null) {
                user.fullname = updatedUser.fullname;
            }
            
            if (updatedUser.email!=null) {
                user.email = updatedUser.email;
            }
            
            if (updatedUser.phone!=null) {
                user.phone = updatedUser.phone;
            }
            
            if (updatedUser.password!=null) {
                user.password = await argon2.hash(updatedUser.password);
            }
            
            await this.userRepository.save(user);

            return user;
        }
        catch(error){
            throw error;
        }
    }

    async updateRole(id: number, updatedRole: UpdateRoleDto): Promise<User> {
        try{
            const user = await this.userRepository.findOne({
                where: { id }
            });

            if (!user) {
                throw new NotFoundException(`Клиент с id ${id} не найден`);
            }
            
            if (updatedRole.role!=null) {
                user.role = updatedRole.role;
            }
            
            await this.userRepository.save(user);

            return user;
        }
        catch(error){
            throw error;
        }
    }

    async updateToken(id: number, updatedUser: UpdateTokenDto): Promise<User> {
        try{
            const user = await this.userRepository.findOne({
                where: { id }
            });

            if (!user) {
                throw new NotFoundException(`Клиент с id ${id} не найден`);
            }

            user.refreshToken = updatedUser.refreshToken;
            
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