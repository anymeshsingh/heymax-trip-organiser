import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Trip } from '@repo/model/trip.model';
import { primaryColorLight } from '@repo/ui/appColors';
import { TripMenuModal } from '../modals/TripMenuModal';

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
  
  // Parse departure date and time
  let depDate: Date;
  if (departureDate.includes('/')) {
    const [month, day, year] = departureDate.split('/');
    depDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  } else if (departureDate.includes('-')) {
    depDate = new Date(departureDate);
  } else {
    depDate = new Date(departureDate);
  }
  
  if (isNaN(depDate.getTime())) return '';
  
  // Parse arrival date (use departure date if arrival date is not provided)
  let arrDate: Date;
  if (arrivalDate) {
    if (arrivalDate.includes('/')) {
      const [month, day, year] = arrivalDate.split('/');
      arrDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    } else if (arrivalDate.includes('-')) {
      arrDate = new Date(arrivalDate);
    } else {
      arrDate = new Date(arrivalDate);
    }
    
    if (isNaN(arrDate.getTime())) {
      arrDate = new Date(depDate); // Fallback to same day if invalid
    }
  } else {
    arrDate = new Date(depDate); // Same day if no arrival date
  }
  
  // Parse times and set them on the dates
  const [depHour, depMin] = departureTime.split(':').map(Number);
  const [arrHour, arrMin] = arrivalTime.split(':').map(Number);
  
  depDate.setHours(depHour, depMin, 0, 0);
  arrDate.setHours(arrHour, arrMin, 0, 0);
  
  // Calculate duration in minutes
  const totalMinutes = Math.floor((arrDate.getTime() - depDate.getTime()) / (1000 * 60));
  
  if (totalMinutes < 0) return ''; // Invalid duration
  
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
      <View style={styles.tripCard}>
        {/* Trip Route and Menu */}
        <View style={styles.routeContainer}>
          <View style={styles.routeInfo}>
            <Text style={styles.boldText}>{departure} to {arrival}</Text>
          </View>
          <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
            <Ionicons name="ellipsis-vertical" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Flight Times */}
        <View style={styles.timesContainer}>
          <Text style={[styles.timeText, !departureTime && styles.placeholderTime]}>
            {formatTime(departureTime) || '--:--'}
          </Text>
          
          {/* Always show the duration line, but only show duration text when both times exist */}
          <View style={styles.durationLine}>
            <View style={styles.line} />
            {duration && <Text style={styles.durationText}>{duration}</Text>}
            <View style={styles.line} />
          </View>
          
          <Text style={[styles.timeText, !arrivalTime && styles.placeholderTime]}>
            {formatTime(arrivalTime) || '--:--'}
            {arrivalDate && arrivalTime && arrivalDate !== departureDate && (
              <Text style={styles.nextDayIndicator}> (+1)</Text>
            )}
          </Text>
        </View>

        {/* Notes Section */}
        {notes && (
          <View style={styles.notesContainer}>
            <Text style={styles.boldText}>Notes:</Text>
            <Text style={styles.secondaryText}>• {notes}</Text>
          </View>
        )}

        {/* Info Source */}
        <Text style={styles.mutedText}>Info from {notes?.includes('Trip.com') ? 'Trip.com' : 'FlyAnywhere'}</Text>

        {/* Add Details Button for Incomplete Trips */}
        {isIncomplete && (
          <TouchableOpacity style={styles.addDetailsTextButton} onPress={onEditPress}>
            <Text style={styles.addDetailsTextButtonText}>Add details</Text>
          </TouchableOpacity>
        )}
      </View>

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

const styles = StyleSheet.create({
  tripCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  routeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  boldText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  menuButton: {
    padding: 4,
  },
  timesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  durationLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  durationText: {
    fontSize: 14,
    color: '#9CA3AF',
    paddingHorizontal: 8,
  },
  nextDayIndicator: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  notesContainer: {
    marginBottom: 12,
  },
  secondaryText: {
    fontSize: 14,
    color: '#6B7280',
  },
  mutedText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
    marginBottom: 0,
  },
  addDetailsTextButton: {
    marginTop: 16,
    alignSelf: 'center',
  },
  addDetailsTextButtonText: {
    fontSize: 16,
    color: primaryColorLight,
    fontWeight: '600',
  },
  placeholderTime: {
    color: '#9CA3AF',
  },
});
