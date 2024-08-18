import { Booking } from "src/bookings/bookings.entity";
import { Photo } from "src/photos/photo.entity";
export declare class Photographer {
    id: number;
    fullname: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    work_exp: number;
    cost: number;
    photo: Photo;
    bookings: Booking[];
}
