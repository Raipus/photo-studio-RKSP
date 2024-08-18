import { Photographer } from "src/photographers/photographer.entity";
import { Studio } from "src/studios/studio.entity";
import { User } from "src/users/user.entity";
export declare class Photo {
    id: number;
    category: string;
    path: string;
    studio: Studio;
    photographer: Photographer;
    user: User;
}
