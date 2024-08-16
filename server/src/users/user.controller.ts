import { User } from "./user.entity";
import { UsersService } from "./user.service";
import { Controller, Get, Put, Param, Body, Post, Delete, ParseIntPipe, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
@ApiTags('Пользователи')
export class UsersController {
    constructor(private readonly UsersService: UsersService) {}

    @ApiOperation({ summary: 'Демонстрация возможности получения всех пользователей в неполном формате' }) 
    @Get('incomplete')
    findIncomplete() {
        return this.UsersService.findIncomplete();
    }

    @ApiOperation({ summary: 'Получить всех пользователей' }) 
    @Get()
    findAll(){
        return this.UsersService.findAll();
    }

    @ApiOperation({ summary: 'Получить конкретного пользователя' }) 
    @Get(':id')
    findOne(@Param('id',ParseIntPipe) id:number) {
        return this.UsersService.findOne(+id);
    }

    @ApiOperation({ summary: 'Изменить пользователя' }) 
    @Put(':id')
    update(@Param('id',ParseIntPipe) id: number, @Body() updateUser: User) {
        return this.UsersService.update(+id,updateUser);
    }

    @ApiOperation({ summary: 'Создать пользователя' }) 
    @Post()
    create(@Body() createUser: CreateUserDto) {
        return this.UsersService.create(createUser);
    }

    @ApiOperation({ summary: 'Удалить пользователя' }) 
    @Delete(':id')
    remove(@Param('id',ParseIntPipe) id: number){
        return this.UsersService.remove(+id);
    }
}