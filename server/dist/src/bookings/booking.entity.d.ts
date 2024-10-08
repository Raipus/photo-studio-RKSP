import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
import { User } from "src/users/user.entity";
export declare class Booking {
    id: number;
    date: string;
    people_number: number;
    user: User;
    studio: Studio;
    photographer: Photographer;
}
