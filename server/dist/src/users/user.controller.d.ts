import { User } from "./user.entity";
import { UsersService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
export declare class UsersController {
    private readonly UsersService;
    constructor(UsersService: UsersService);
    findIncomplete(): Promise<import("./dto/incomplete-user.dto").IncompleteUserDto[]>;
    findAll(): Promise<User[]>;
    findOne(email: string): Promise<User>;
    findOneId(id: number): Promise<User>;
    update(id: number, updateUser: UpdateUserDto): Promise<User>;
    updateRole(id: number, updateUserRole: UpdateRoleDto): Promise<User>;
    create(createUser: CreateUserDto): Promise<User>;
    remove(id: number): Promise<import("@nestjs/common").HttpStatus>;
}
