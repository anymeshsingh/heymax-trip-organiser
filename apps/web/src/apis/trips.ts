import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Trip } from '@repo/model/trip.model';
import { tripClient } from './client';

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
    queryFn: tripClient.getAllTrips,
  });
};

export const useTrip = (id: string) => {
  return useQuery({
    queryKey: tripKeys.detail(id),
    queryFn: () => tripClient.getTripById(id),
    enabled: !!id,
  });
};

export const useCreateTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tripClient.createTrip,
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
      tripClient.updateTrip(id, trip),
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
    mutationFn: tripClient.deleteTrip,
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