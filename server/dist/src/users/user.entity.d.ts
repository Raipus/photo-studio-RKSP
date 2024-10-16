import { Booking } from "src/bookings/booking.entity";
export declare class User {
    id: number;
    fullname: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    refreshToken: string;
    bookings: Booking[];
}
