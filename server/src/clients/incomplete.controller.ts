import { ClientsService } from "./clients.service";
import { Controller, Get} from "@nestjs/common";
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('incomplete')
@ApiTags('Клиенты')
export class IncompleteController {
    constructor(private readonly clientsService: ClientsService) {}

    @ApiOperation({ summary: 'Получить всех клиентов в неполном формате' }) 
    @Get()
    findIncomplete(){
        return this.clientsService.findIncomplete();
    }
}