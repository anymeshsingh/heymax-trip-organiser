import { NextRequest, NextResponse } from 'next/server';
import { getTripById, updateTrip, deleteTrip } from '../../../../src/data/trips';

interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/trips/[id] - Get a specific trip
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const trip = getTripById((await params).id);
    
    if (!trip) {
      return NextResponse.json(
        {
          success: false,
          error: 'Trip not found'
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: trip,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch trip'
      },
      { status: 500 }
    );
  }
}

// PUT /api/trips/[id] - Update a specific trip
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const body = await request.json();
    
    const updatedTrip = updateTrip((await params).id, body);
    
    if (!updatedTrip) {
      return NextResponse.json(
        {
          success: false,
          error: 'Trip not found'
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: updatedTrip,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update trip'
      },
      { status: 500 }
    );
  }
}

// DELETE /api/trips/[id] - Delete a specific trip
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    
    const success = deleteTrip((await params).id);
    
    if (!success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Trip not found'
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Trip deleted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete trip'
      },
      { status: 500 }
    );
  }
}
