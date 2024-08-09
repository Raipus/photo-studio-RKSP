import { Injectable } from "@nestjs/common";
import { Client } from "src/clients/client.entity";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";

@Injectable ()
export class DatasourceService {
    private clients: Client[] = [];
    getClients(): Client[] {
        return this.clients;
    }

    private photographers: Photographer[] = [];
    getPhotographers(): Photographer[] {
        return this.photographers;
    }

    private studios: Studio[] = [];
    getStudios(): Studio[] {
        return this.studios;
    }

}