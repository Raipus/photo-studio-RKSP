import { Booking } from "src/bookings/bookings.entity";
import { Photo } from "src/photos/photo.entity";
export declare class Studio {
    id: number;
    name: string;
    location: string;
    description: string;
    cost: number;
    photos: Photo[];
    bookings: Booking[];
}
