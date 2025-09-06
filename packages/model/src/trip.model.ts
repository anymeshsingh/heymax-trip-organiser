export interface Trip {
    id?: string | undefined;
    departure: string;
    arrival: string;
    departureDate?: string | undefined;
    departureTime?: string | undefined;
    arrivalDate?: string | undefined;
    arrivalTime?: string | undefined;
    notes?: string | undefined;
}