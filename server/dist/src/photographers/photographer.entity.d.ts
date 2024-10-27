import { Booking } from 'src/bookings/booking.entity';
export declare class Photographer {
    id: number;
    fullname: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    refreshToken: string;
    work_exp: number;
    cost: number;
    bookings: Booking[];
}
