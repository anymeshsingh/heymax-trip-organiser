import { TripDetails } from './TripDetails';
import { AdvertisementCard } from './AdvertisementCard';
import { Trip } from '@repo/model/Trip.model'

interface TripCardProps {
  trip: Trip;
  showAdvertisement?: boolean;
  onEditPress: () => void;
  onDeletePress: () => void;
}

const getDaysUntilTrip = (departureDate?: string) => {
  if (!departureDate) return null;
  
  let departure: Date;
  
  if (departureDate.includes('/')) {
    const [month, day, year] = departureDate.split('/');
    departure = new Date(parseInt(year!), parseInt(month!) - 1, parseInt(day!));
  } else if (departureDate.includes('-')) {
    departure = new Date(departureDate);
  } else {
    departure = new Date(departureDate);
  }
  
  if (isNaN(departure.getTime())) {
    return null;
  }
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  departure.setHours(0, 0, 0, 0);
  
  const diffTime = departure.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  
  let date: Date;
  
  if (dateString.includes('/')) {
    const [month, day, year] = dateString.split('/');
    date = new Date(parseInt(year!), parseInt(month!) - 1, parseInt(day!));
  } else if (dateString.includes('-')) {
    date = new Date(dateString);
  } else {
    date = new Date(dateString);
  }
  
  if (isNaN(date.getTime())) {
    return dateString;
  }
  
  return date.toLocaleDateString('en-GB', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
};

export const TripCard: React.FC<TripCardProps> = ({
  trip,
  showAdvertisement = false,
  onEditPress,
  onDeletePress,
}) => {
  const { departureDate } = trip;
  const daysDifference = getDaysUntilTrip(departureDate);

  return (
    <div className="rounded-2xl mx-6 my-2 relative">
      {/* Vertical Timeline Line */}
      <div className="absolute left-0.5 top-7 bottom-7 w-0.5 bg-gray-200" />
      
      {/* Timeline Dots */}
      <div className="absolute left-[-5px] top-7 w-4 h-4 rounded-full border-2 border-white bg-primary-dark" />
      <div className="absolute left-[-3px] top-[30%] mt-[-18px] w-3 h-3 rounded-full border-2 border-white bg-gray-300" />
      <div className="absolute left-[-3px] bottom-7 w-3 h-3 rounded-full border-2 border-white bg-gray-300" />

      {/* Content with left padding for timeline */}
      <div className="pl-5">
        {/* Header with days until/since trip */}
        {daysDifference !== null && (
          <div className="mb-4">
            <div className="flex flex-row items-center mb-1">
              <span className="text-lg font-bold text-foreground-light">
                {daysDifference === 0 
                  ? 'Today'
                  : daysDifference > 0 
                  ? `In ${daysDifference} days` 
                  : `${Math.abs(daysDifference)} days ago`}
              </span>
            </div>
            <span className="text-sm text-secondary-foreground mt-0.5">
              {formatDate(departureDate)}
            </span>
          </div>
        )}

        {/* Trip Details Component */}
        <TripDetails
          trip={trip}
          onEditPress={onEditPress}
          onDeletePress={onDeletePress}
        />

        {/* Advertisement Section */}
        {showAdvertisement && <AdvertisementCard />}
      </div>
    </div>
  );
};
