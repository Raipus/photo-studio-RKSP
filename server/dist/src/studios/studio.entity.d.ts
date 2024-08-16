import { User } from "src/users/user.entity";
export declare class Studio {
    id: number;
    name: string;
    location: string;
    description: string;
    users: User[];
}
