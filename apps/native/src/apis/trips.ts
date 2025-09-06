import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Trip } from '@repo/model/trip.model';

// Hardcoded trips data (simulating API response)
const HARDCODED_TRIPS: Trip[] = [
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

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API functions (simulating real API calls)
export const tripsApi = {
  getTrips: async (): Promise<Trip[]> => {
    await delay(500); // Simulate network delay
    return [...HARDCODED_TRIPS];
  },

  getTripById: async (id: string): Promise<Trip | undefined> => {
    await delay(300);
    return HARDCODED_TRIPS.find(trip => trip.id === id);
  },

  createTrip: async (trip: Omit<Trip, 'id'>): Promise<Trip> => {
    await delay(1000);
    const newTrip: Trip = {
      ...trip,
      id: Date.now().toString(), // Generate simple ID
    };
    return newTrip;
  },

  updateTrip: async (id: string, trip: Partial<Trip>): Promise<Trip> => {
    await delay(800);
    const existingTrip = HARDCODED_TRIPS.find(t => t.id === id);
    if (!existingTrip) {
      throw new Error('Trip not found');
    }
    const updatedTrip: Trip = {
      ...existingTrip,
      ...trip,
      id,
    };
    return updatedTrip;
  },

  deleteTrip: async (id: string): Promise<void> => {
    await delay(500);
    // In real API, this would delete from server
    // For now, we just simulate the delay
  },
};

// Query Keys
export const tripKeys = {
  all: ['trips'] as const,
  lists: () => [...tripKeys.all, 'list'] as const,
  list: (filters: string) => [...tripKeys.lists(), { filters }] as const,
  details: () => [...tripKeys.all, 'detail'] as const,
  detail: (id: string) => [...tripKeys.details(), id] as const,
};

// React Query Hooks
export const useTrips = () => {
  return useQuery({
    queryKey: tripKeys.lists(),
    queryFn: tripsApi.getTrips,
  });
};

export const useTrip = (id: string) => {
  return useQuery({
    queryKey: tripKeys.detail(id),
    queryFn: () => tripsApi.getTripById(id),
    enabled: !!id,
  });
};

export const useCreateTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tripsApi.createTrip,
    onSuccess: (newTrip) => {
      // Update the trips list cache
      queryClient.setQueryData<Trip[]>(tripKeys.lists(), (oldTrips = []) => [
        ...oldTrips,
        newTrip,
      ]);
      // Invalidate and refetch trips
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
    },
  });
};

export const useUpdateTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, trip }: { id: string; trip: Partial<Trip> }) =>
      tripsApi.updateTrip(id, trip),
    onSuccess: (updatedTrip) => {
      // Update specific trip cache
      queryClient.setQueryData(tripKeys.detail(updatedTrip.id!), updatedTrip);
      
      // Update trips list cache
      queryClient.setQueryData<Trip[]>(tripKeys.lists(), (oldTrips = []) =>
        oldTrips.map(trip =>
          trip.id === updatedTrip.id ? updatedTrip : trip
        )
      );
      
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
      queryClient.invalidateQueries({ queryKey: tripKeys.detail(updatedTrip.id!) });
    },
  });
};

export const useDeleteTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tripsApi.deleteTrip,
    onSuccess: (_, deletedId) => {
      // Remove from trips list cache
      queryClient.setQueryData<Trip[]>(tripKeys.lists(), (oldTrips = []) =>
        oldTrips.filter(trip => trip.id !== deletedId)
      );
      
      // Remove specific trip cache
      queryClient.removeQueries({ queryKey: tripKeys.detail(deletedId) });
      
      // Invalidate trips list
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
    },
  });
};
