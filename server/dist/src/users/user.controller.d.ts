import { User } from "./user.entity";
import { UsersService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UsersController {
    private readonly UsersService;
    constructor(UsersService: UsersService);
    findIncomplete(): Promise<import("./dto/incomplete-user.dto").IncompleteUserDto[]>;
    findAll(): Promise<User[]>;
    findOne(email: string): Promise<User>;
    update(id: number, updateUser: UpdateUserDto): Promise<User>;
    create(createUser: CreateUserDto): Promise<{
        newUser: User;
        token: string;
    }>;
    remove(id: number): Promise<import("@nestjs/common").HttpStatus>;
}
