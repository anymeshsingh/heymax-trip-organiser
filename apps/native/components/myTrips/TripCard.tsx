import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Trip } from '@repo/model/Trip.model';
import { foregroundColorDark, foregroundColorLight, primaryColorDark, secondaryForegroundColor, tertiaryForegroundColor } from '@repo/ui/appColors';
import { AdvertisementCard } from './AdvertisementCard';
import { TripDetails } from './TripDetails';

interface TripCardProps {
  trip: Trip;
  showAdvertisement?: boolean;
  onEditPress: () => void;
  onDeletePress: () => void;
}

const getDaysUntilTrip = (departureDate?: string) => {
  if (!departureDate) return null;
  
  // Handle different date formats
  let departure: Date;
  
  if (departureDate.includes('/')) {
    // Handle MM/DD/YYYY format from API
    const [month, day, year] = departureDate.split('/');
    departure = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  } else if (departureDate.includes('-')) {
    // Handle YYYY-MM-DD format
    departure = new Date(departureDate);
  } else {
    // Fallback to direct parsing
    departure = new Date(departureDate);
  }
  
  if (isNaN(departure.getTime())) {
    return null;
  }
  
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day
  departure.setHours(0, 0, 0, 0); // Reset time to start of day
  
  const diffTime = departure.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays; // Return the actual difference (positive for future, negative for past)
};

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  
  let date: Date;
  
  if (dateString.includes('/')) {
    // Handle MM/DD/YYYY format
    const [month, day, year] = dateString.split('/');
    date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  } else if (dateString.includes('-')) {
    // Handle YYYY-MM-DD format
    date = new Date(dateString);
  } else {
    // Fallback
    date = new Date(dateString);
  }
  
  if (isNaN(date.getTime())) {
    return dateString; // Return original string if parsing fails
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
    <View style={styles.card}>
      {/* Vertical Timeline Line */}
      <View style={styles.timelineLine} />
      
      {/* Timeline Dots - positioned at different heights */}
      <View style={[styles.timelineDot, styles.activeDot, styles.firstDot]} />
      <View style={[styles.timelineDot, styles.inactiveDot, styles.secondDot]} />
      <View style={[styles.timelineDot, styles.inactiveDot, styles.thirdDot]} />

      {/* Content with left padding for timeline */}
      <View style={styles.contentWrapper}>
        {/* Header with days until/since trip */}
        {daysDifference !== null && (
          <View style={styles.header}>
            <View style={styles.daysContainer}>
              <Text style={styles.daysText}>
                {daysDifference === 0 
                  ? 'Today'
                  : daysDifference > 0 
                  ? `In ${daysDifference} days` 
                  : `${Math.abs(daysDifference)} days ago`}
              </Text>
            </View>
            <Text style={styles.dateText}>{formatDate(departureDate)}</Text>
          </View>
        )}

        {/* Trip Details Component */}
        <TripDetails
          trip={trip}
          onEditPress={onEditPress}
          onDeletePress={onDeletePress}
        />

        {/* Advertisement Section */}
        {showAdvertisement && <AdvertisementCard />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginHorizontal: 24,
    marginVertical: 8,
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    left: 1,
    top: 30,
    bottom: 30,
    width: 2,
    backgroundColor: tertiaryForegroundColor,
  },
  timelineDot: {
    position: 'absolute',
    left: -6,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'white',
  },
  firstDot: {
    top: 30,
  },
  secondDot: {
    top: '30%',
    marginTop: -18,
    width: 12,
    height: 12,
    borderRadius: 6,
    left: -4,
  },
  thirdDot: {
    bottom: 30,
    width: 12,
    height: 12,
    borderRadius: 6,
    left: -4,
  },
  activeDot: {
    backgroundColor: primaryColorDark,
  },
  inactiveDot: {
    backgroundColor: secondaryForegroundColor,
  },
  contentWrapper: {
    paddingLeft: 20,
  },
  header: {
    marginBottom: 16,
  },
  daysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  daysText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: foregroundColorLight,
  },
  dateText: {
    fontSize: 14,
    color: secondaryForegroundColor,
    marginTop: 2,
  },
});