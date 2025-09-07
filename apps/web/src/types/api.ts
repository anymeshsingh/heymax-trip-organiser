import { Trip } from '@repo/model/Trip.model'
import { ApiResponse } from '@repo/model/ApiResponse.model'

export interface TripsResponse extends ApiResponse<Trip[]> {}

export interface TripResponse extends ApiResponse<Trip> {}

export interface DeleteTripResponse extends ApiResponse<never> {}
