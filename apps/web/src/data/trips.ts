import { Trip } from '@repo/model/trip.model'

// In-memory data store (simulating a database)
export let trips: Trip[] = [
  {
    id: '1',
    departure: "Singapore, SIN",
    arrival: "Hong Kong, HKG",
    departureDate: "09/11/2025",
    departureTime: "16:05",
    arrivalDate: "09/11/2025",
    arrivalTime: "16:05",
    notes: "Booking reference: Booking ref: 5AJSDH"
  },
  {
    id: '2',
    departure: "Singapore, SIN",
    arrival: "Hong Kong, HKG",
    departureDate: "09/13/2025",
    departureTime: "16:05",
    arrivalDate: "09/13/2025",
    arrivalTime: "21:10",
    notes: "Booking reference: Booking ref: 5AJSDH"
  },
  {
    id: '3',
    departure: "Singapore, SIN",
    arrival: "Hong Kong, HKG",
    departureDate: "10/10/2025",
    departureTime: "16:05",
    arrivalDate: "10/10/2025",
    arrivalTime: "21:10",
    notes: "Booking reference: Booking ref: 5AJSDH"
  },
  {
    id: '4',
    departure: "Singapore, SIN",
    arrival: "Hong Kong, HKG",
    departureDate: "07/07/2025",
    departureTime: "02:02",
    arrivalDate: "07/08/2025",
    arrivalTime: "02:02",
    notes: "Booking reference: Booking ref: 5AJSDH"
  },
  {
    id: '5',
    departure: "Singapore, SIN",
    arrival: "Hong Kong, HKG",
    departureDate: "06/06/2025",
    departureTime: "03:03",
    arrivalDate: "06/06/2025",
    arrivalTime: "04:10",
    notes: "Booking reference: Booking ref: 5AJSDH"
  }
];

// Helper functions for data manipulation
export const getAllTrips = (): Trip[] => {
  return [...trips];
};

export const getTripById = (id: string): Trip | undefined => {
  return trips.find(trip => trip.id === id);
};

export const createTrip = (tripData: Omit<Trip, 'id'>): Trip => {
  const newTrip: Trip = {
    ...tripData,
    id: Date.now().toString(), // Simple ID generation
  };
  trips.push(newTrip);
  return newTrip;
};

export const updateTrip = (id: string, tripData: Partial<Trip>): Trip | null => {
  const index = trips.findIndex(trip => trip.id === id);
  if (index === -1) {
    return null;
  }
  
  const updatedTrip = <Trip>{
    ...trips[index],
    ...tripData,
    id, // Ensure ID doesn't change
  };
  
  trips[index] = updatedTrip;
  return updatedTrip;
};

export const deleteTrip = (id: string): boolean => {
  const index = trips.findIndex(trip => trip.id === id);
  if (index === -1) {
    return false;
  }
  
  trips.splice(index, 1);
  return true;
};
