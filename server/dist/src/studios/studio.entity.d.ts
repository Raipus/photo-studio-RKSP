import { Booking } from "src/bookings/booking.entity";
export declare class Studio {
    id: number;
    name: string;
    location: string;
    description: string;
    cost: number;
    bookings: Booking[];
}
