import { User } from "./user.entity";
import { UsersService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
export declare class UsersController {
    private readonly UsersService;
    constructor(UsersService: UsersService);
    findIncomplete(): Promise<import("./dto/incomplete-user.dto").IncompleteUserDto[]>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUser: User): Promise<User>;
    create(createUser: CreateUserDto): Promise<User>;
    remove(id: number): Promise<import("@nestjs/common").HttpStatus>;
}
