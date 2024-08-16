import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
export declare class User {
    id: number;
    fullname: string;
    phone: string;
    studios: Studio[];
    photographers: Photographer[];
}
