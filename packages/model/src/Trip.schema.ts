import { z } from 'zod';

export const TripSchema = z.object({
	departure: z.string().min(1, 'Departure city is required'),
	arrival: z.string().min(1, 'Arrival city is required'),
	departureDate: z.string().min(1, 'Required'),
	departureTime: z.string().min(1, 'Required'),
	arrivalDate: z.string().optional(),
	arrivalTime: z.string().optional(),
	notes: z.string().optional(),
});

export type TripFormData = z.infer<typeof TripSchema>;