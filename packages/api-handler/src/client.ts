import { Trip } from '@repo/model/Trip.model';
import { ApiResponse } from '@repo/model/ApiResponse.model';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

// CRUD functions using fetch
export const tripClient = {
  // GET /api/trips - Get all trips
  getAllTrips: async (): Promise<Trip[]> => {
    const response = await fetch(`${API_BASE_URL}/trips`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch trips: ${response.statusText}`);
    }
    
    const result: ApiResponse<Trip[]> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch trips');
    }
    
    return result.data || [];
  },

  // GET /api/trips/[id] - Get a specific trip
  getTripById: async (id: string): Promise<Trip | undefined> => {
    const response = await fetch(`${API_BASE_URL}/trips/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return undefined;
      }
      throw new Error(`Failed to fetch trip: ${response.statusText}`);
    }
    
    const result: ApiResponse<Trip> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch trip');
    }
    
    return result.data;
  },

  // POST /api/trips - Create a new trip
  createTrip: async (trip: Omit<Trip, 'id'>): Promise<Trip> => {
    const response = await fetch(`${API_BASE_URL}/trips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trip),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create trip: ${response.statusText}`);
    }
    
    const result: ApiResponse<Trip> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to create trip');
    }
    
    if (!result.data) {
      throw new Error('No data returned from create trip');
    }
    
    return result.data;
  },

  // PUT /api/trips/[id] - Update a specific trip
  updateTrip: async (id: string, trip: Partial<Trip>): Promise<Trip> => {
    const response = await fetch(`${API_BASE_URL}/trips/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trip),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update trip: ${response.statusText}`);
    }
    
    const result: ApiResponse<Trip> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to update trip');
    }
    
    if (!result.data) {
      throw new Error('No data returned from update trip');
    }
    
    return result.data;
  },

  // DELETE /api/trips/[id] - Delete a specific trip
  deleteTrip: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/trips/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete trip: ${response.statusText}`);
    }
    
    const result: ApiResponse<never> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to delete trip');
    }
  },
};
