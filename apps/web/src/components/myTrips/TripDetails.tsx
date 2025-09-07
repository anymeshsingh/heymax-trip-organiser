import { useState } from 'react';
import { IoEllipsisVertical } from 'react-icons/io5';
import { TripMenuModal } from '../modals/TripMenuModal';
import { Trip } from '@repo/model/trip.model'

interface TripDetailsProps {
  trip: Trip;
  onEditPress: () => void;
  onDeletePress: () => void;
}

const formatTime = (timeString?: string) => {
  if (!timeString) return '';
  return timeString;
};

const calculateDuration = (departureTime?: string, arrivalTime?: string, departureDate?: string, arrivalDate?: string) => {
  if (!departureTime || !arrivalTime || !departureDate) return '';
  
  let depDate: Date;
  if (departureDate.includes('/')) {
    const [month, day, year] = departureDate.split('/');
    depDate = new Date(parseInt(year!), parseInt(month!) - 1, parseInt(day!));
  } else if (departureDate.includes('-')) {
    depDate = new Date(departureDate);
  } else {
    depDate = new Date(departureDate);
  }
  
  if (isNaN(depDate.getTime())) return '';
  
  let arrDate: Date;
  if (arrivalDate) {
    if (arrivalDate.includes('/')) {
      const [month, day, year] = arrivalDate.split('/');
      arrDate = new Date(parseInt(year!), parseInt(month!) - 1, parseInt(day!));
    } else if (arrivalDate.includes('-')) {
      arrDate = new Date(arrivalDate);
    } else {
      arrDate = new Date(arrivalDate);
    }
    
    if (isNaN(arrDate.getTime())) {
      arrDate = new Date(depDate);
    }
  } else {
    arrDate = new Date(depDate);
  }
  
  const [depHour, depMin] = departureTime.split(':').map(Number);
  const [arrHour, arrMin] = arrivalTime.split(':').map(Number);
  
  depDate.setHours(depHour!, depMin, 0, 0);
  arrDate.setHours(arrHour!, arrMin, 0, 0);
  
  const totalMinutes = Math.floor((arrDate.getTime() - depDate.getTime()) / (1000 * 60));
  
  if (totalMinutes < 0) return '';
  
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  return `${hours}h ${minutes}m`;
};

const isIncompleteTrip = (trip: Trip) => {
  return !trip.departureTime || !trip.arrivalTime || !trip.arrivalDate;
};

export const TripDetails: React.FC<TripDetailsProps> = ({
  trip,
  onEditPress,
  onDeletePress,
}) => {
  const { departure, arrival, departureDate, departureTime, arrivalDate, arrivalTime, notes } = trip;
  const [showMenuModal, setShowMenuModal] = useState(false);
  const isIncomplete = isIncompleteTrip(trip);
  const duration = calculateDuration(departureTime, arrivalTime, departureDate, arrivalDate);

  const handleMenuPress = () => {
    setShowMenuModal(true);
  };

  const handleEdit = () => {
    setShowMenuModal(false);
    onEditPress();
  };

  const handleDelete = () => {
    setShowMenuModal(false);
    onDeletePress();
  };

  return (
    <>
      <div className="bg-white rounded-xl p-4 mb-4">
        {/* Trip Route and Menu */}
        <div className="flex flex-row justify-between items-center mb-4">
          <div className="flex flex-row items-center flex-1">
            <span className="text-sm text-foreground-light font-medium">
              {departure} to {arrival}
            </span>
          </div>
          <button className="p-1" onClick={handleMenuPress}>
            <IoEllipsisVertical size={20} className="text-secondary-foreground" />
          </button>
        </div>

        {/* Flight Times */}
        <div className="flex flex-row items-center mb-4">
          <span className={`text-2xl font-bold ${!departureTime ? 'text-secondary-foreground' : 'text-foreground-light'}`}>
            {formatTime(departureTime) || '--:--'}
          </span>
          
          <div className="flex-1 flex flex-row items-center mx-4">
            <div className="flex-1 h-px bg-gray-200" />
            {duration && <span className="text-sm text-secondary-foreground px-2">{duration}</span>}
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          
          <span className={`text-2xl font-bold ${!arrivalTime ? 'text-secondary-foreground' : 'text-foreground-light'}`}>
            {formatTime(arrivalTime) || '--:--'}
            {arrivalDate && arrivalTime && arrivalDate !== departureDate && (
              <span className="text-base font-normal"> (+1)</span>
            )}
          </span>
        </div>

        {/* Notes Section */}
        {notes && (
          <div className="mb-3">
            <span className="text-sm text-foreground-light font-medium mb-1 block">Notes:</span>
            <span className="text-sm text-secondary-foreground">• {notes}</span>
          </div>
        )}

        {/* Info Source */}
        <span className="text-sm text-secondary-foreground italic mb-0">
          Info from {notes?.includes('Trip.com') ? 'Trip.com' : 'FlyAnywhere'}
        </span>

        {/* Add Details Button for Incomplete Trips */}
        {isIncomplete && (
          <div className="mt-4 flex justify-center">
            <button onClick={onEditPress}>
              <span className="text-base text-primary-light font-semibold">Add details</span>
            </button>
          </div>
        )}
      </div>

      {/* Trip Menu Modal */}
      <TripMenuModal
        visible={showMenuModal}
        onClose={() => setShowMenuModal(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
};
