import { Client } from "src/clients/client.entity";
export declare class Studio {
    id: number;
    name: string;
    location: string;
    description: string;
    clients: Client[];
}
