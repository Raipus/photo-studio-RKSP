import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { IncompleteUserDto } from "./dto/incomplete-user.dto";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";

@Injectable ()
export class UsersService {
    constructor (
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Photographer)
        private readonly photographerRepository: Repository<Photographer>,
        @InjectRepository(Studio)
        private readonly studioRepository: Repository<Studio>
    ) {}

    async create(userDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create();
        user.fullname = userDto.fullname;
        user.phone = userDto.phone;
        await this.userRepository.save(user);
        return user;
    }

    async findOne(id: number): Promise<User> {
        try{
            const user = await this.userRepository.findOne({
                where: { id },
                relations: {studios: true, photographers: true}
            });

            if (!user) {
                throw new NotFoundException(`Клиент с id ${id} не найден`);
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
                photographers: false,
                studios: true,
            }
        });
        const incompleteUsers: IncompleteUserDto[] = users.map((user) => {
            const incompleteUser = new IncompleteUserDto();
            incompleteUser.fullname = user.fullname;
            incompleteUser.studios = user.studios.map((studio) => studio.id);
            return incompleteUser;
        });
        return incompleteUsers;
    }

    async update(id: number, updatedUser: User): Promise<User> {
        try{
            const user = await this.userRepository.findOne({
                where: { id },
                relations: {studios: true, photographers: true}
            });

            if (!user) {
                throw new NotFoundException(`Клиент с id ${id} не найден`);
            }

            user.fullname = updatedUser.fullname;

            user.phone = updatedUser.phone;

            const studios = await this.studioRepository.findBy({
                id: In(updatedUser.studios),
            });
            user.studios = studios;

            const photographers = await this.photographerRepository.findBy({
                id: In(updatedUser.photographers),
            });
            user.photographers = photographers;

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