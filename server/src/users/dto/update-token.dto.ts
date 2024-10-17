import { ApiProperty } from "@nestjs/swagger";

export class UpdateTokenDto {
    @ApiProperty({ example: 'some token', description: 'Токен' })
    refreshToken: string;
}