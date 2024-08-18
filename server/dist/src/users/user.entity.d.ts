import { Booking } from "src/bookings/bookings.entity";
import { Photo } from "src/photos/photo.entity";
export declare class User {
    id: number;
    fullname: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    photo: Photo;
    bookings: Booking[];
}
