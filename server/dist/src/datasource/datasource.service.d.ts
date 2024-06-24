import { Client } from "src/clients/client.entity";
import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
export declare class DatasourceService {
    private clients;
    getClients(): Client[];
    private photographers;
    getPhotographers(): Photographer[];
    private studios;
    getStudios(): Studio[];
}
