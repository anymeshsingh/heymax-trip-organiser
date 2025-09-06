import { Trip } from '@repo/model/trip.model'
import { ApiResponse } from '@repo/model/apiResponse.model'

export interface TripsResponse extends ApiResponse<Trip[]> {}

export interface TripResponse extends ApiResponse<Trip> {}

export interface DeleteTripResponse extends ApiResponse<never> {}
