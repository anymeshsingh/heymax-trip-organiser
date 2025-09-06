import { NextRequest, NextResponse } from 'next/server';
import { getAllTrips, createTrip } from '../../../src/data/trips';

// GET /api/trips - Get all trips
export async function GET() {
  try {
    const trips = getAllTrips();
    return NextResponse.json({
      success: true,
      data: trips,
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch trips' 
      },
      { status: 500 }
    );
  }
}

// POST /api/trips - Create a new trip
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.departure || !body.arrival) {
      return NextResponse.json(
        {
          success: false,
          error: 'Departure and arrival cities are required'
        },
        { status: 400 }
      );
    }
    
    const newTrip = createTrip(body);
    
    return NextResponse.json({
      success: true,
      data: newTrip,
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create trip'
      },
      { status: 500 }
    );
  }
}
