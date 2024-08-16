import { Module } from "@nestjs/common";
import { Studio } from "./studio.entity";
import { StudiosController } from "./studios.controller";
import { StudiosService } from "./studios.service";
import { User } from "src/users/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    controllers: [StudiosController],
    providers: [StudiosService],
    imports: [Studio,TypeOrmModule.forFeature([User,Studio])],
})

export class StudiosModule {}