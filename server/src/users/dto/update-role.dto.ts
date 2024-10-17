import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateRoleDto {
    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'user', description: 'Роль пользователя' })
    role: string;
}