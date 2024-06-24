import { Client } from "src/clients/client.entity";
export declare class Photographer {
    id: number;
    fullname: string;
    phone: string;
    work_exp: number;
    clients: Client[];
}
