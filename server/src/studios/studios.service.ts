import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Studio } from "./studio.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateStudioDto } from "./dto/create-studio.dto";
import { Photo } from "src/photos/photo.entity";
import { Booking } from "src/bookings/booking.entity";

@Injectable ()
export class StudiosService {
    constructor (
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
        @InjectRepository(Studio)
        private readonly studioRepository: Repository<Studio>,
        @InjectRepository(Photo)
        private readonly photoRepository: Repository<Photo>
    ) {}

    async create(studioNew: CreateStudioDto): Promise<Studio> {
        const studio = this.studioRepository.create();
        studio.name = studioNew.name;
        studio.location = studioNew.location;
        studio.description = studioNew.description;
        studio.cost = studioNew.cost;
        await this.studioRepository.save(studio);
        return studio;
    }

    async findOne(id: number): Promise<Studio> {
        try{
            const studio = await this.studioRepository.findOne({ where: { id } });
            
            if(!studio){
                throw new NotFoundException(`Студия с id ${id} не найдена`);
            }

            return studio;
        }
        catch(error){
            throw error;
        }
    }

    async findAll(): Promise<Studio[]> {
        const studios = await this.studioRepository.find();
        return studios;
    }

    async update(id: number, updatedStudio: Studio): Promise<Studio>  {
        try{
            const studio = await this.studioRepository.findOne({
                where: { id },
                relations: {
                    photos:true,
                    bookings:true
                }
            });

            if(!studio){
                throw new NotFoundException(`Студия с id ${id} не найдена`);
            }
            
            studio.name = updatedStudio.name;
            studio.location = updatedStudio.location;
            studio.description = updatedStudio.description;
            studio.cost = updatedStudio.cost;

            if (updatedStudio.bookings!=null) {
                const bookings = await this.bookingRepository.findBy({
                    id: In(updatedStudio.bookings),
                });
                studio.bookings = bookings;
            }

            if (updatedStudio.photos!=null) {
                const photos = await this.photoRepository.findBy({
                    id: In(updatedStudio.photos),
                });
                studio.photos = photos;
            }

            await this.studioRepository.save(studio);
            return studio;
        }
        catch(error){
            throw error;
        }
    }

    async remove(id: number) {
        try{
            const studio = await this.studioRepository.findOne({where: { id }});
            
            if(!studio){
                throw new NotFoundException(`Студия с id ${id} не найдена`);
            }

            this.studioRepository.delete({id});
            return HttpStatus.OK;
        }
        catch(error){
            throw error;
        }
    }
}