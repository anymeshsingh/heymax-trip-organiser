import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Trip } from '@repo/model/trip.model';
import { primaryColorDark, primaryColorLight } from '@repo/ui/appColors';
import { AdvertisementCard } from './AdvertisementCard';
import { TripMenuModal } from '../modals/TripMenuModal';
import { router } from 'expo-router';

interface TripCardProps {
  trip: Trip;
  showAdvertisement?: boolean;
  onEditPress: () => void;
  onDeletePress: () => void;
}

const getDaysUntilTrip = (departureDate?: string) => {
  if (!departureDate) return null;
  
  const departure = new Date(departureDate);
  const today = new Date();
  const diffTime = departure.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 0 ? diffDays : null;
};

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
};

const formatTime = (timeString?: string) => {
  if (!timeString) return '';
  return timeString;
};

const calculateDuration = (departureTime?: string, arrivalTime?: string) => {
  if (!departureTime || !arrivalTime) return '';
  
  // Simple duration calculation - you might want to make this more sophisticated
  const [depHour, depMin] = departureTime.split(':').map(Number);
  const [arrHour, arrMin] = arrivalTime.split(':').map(Number);
  
  let totalMinutes = (arrHour * 60 + arrMin) - (depHour * 60 + depMin);
  if (totalMinutes < 0) totalMinutes += 24 * 60; // Next day arrival
  
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  return `${hours}h ${minutes}m`;
};

const isIncompleteTrip = (trip: Trip) => {
  return !trip.departureTime || !trip.arrivalTime || !trip.arrivalDate;
};

export const TripCard: React.FC<TripCardProps> = ({
  trip,
  showAdvertisement = false,
  onEditPress,
  onDeletePress,
}) => {
  const { departure, arrival, departureDate, departureTime, arrivalDate, arrivalTime, notes } = trip;
  const [showMenuModal, setShowMenuModal] = useState(false);
  const daysUntil = getDaysUntilTrip(departureDate);
  const isIncomplete = isIncompleteTrip(trip);
  const duration = calculateDuration(departureTime, arrivalTime);

  const handleMenuPress = () => {
    setShowMenuModal(true);
  };

  const handleEdit = () => {
    setShowMenuModal(false);
    onEditPress?.();
  };

  const handleDelete = () => {
    setShowMenuModal(false);
    onDeletePress?.();
  };

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
        {/* Header with days until trip */}
        {daysUntil && (
          <View style={styles.header}>
            <View style={styles.daysContainer}>
              {/* <View style={styles.purpleCircle} /> */}
              <Text style={styles.daysText}>In {daysUntil} days</Text>
            </View>
            <Text style={styles.dateText}>{formatDate(departureDate)}</Text>
          </View>
        )}

        {/* Main Trip Card */}
        <View style={styles.tripCard}>
          {/* Trip Route and Menu */}
          <View style={styles.routeContainer}>
            <View style={styles.routeInfo}>
              {/* <View style={styles.routeCircle} /> */}
              <Text style={styles.routeText}>{departure} to {arrival}</Text>
            </View>
            <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
              <Ionicons name="ellipsis-vertical" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Flight Times */}
          <View style={styles.timesContainer}>
            <Text style={[styles.departureTime, !departureTime && styles.placeholderTime]}>
              {formatTime(departureTime) || '--:--'}
            </Text>
            
            {/* Always show the duration line, but only show duration text when both times exist */}
            <View style={styles.durationLine}>
              <View style={styles.line} />
              {duration && <Text style={styles.durationText}>{duration}</Text>}
              <View style={styles.line} />
            </View>
            
            <Text style={[styles.arrivalTime, !arrivalTime && styles.placeholderTime]}>
              {formatTime(arrivalTime) || '--:--'}
              {arrivalDate && arrivalTime && arrivalDate !== departureDate && (
                <Text style={styles.nextDayIndicator}> (+1)</Text>
              )}
            </Text>
          </View>

          {/* Notes Section */}
          {notes && (
            <View style={styles.notesContainer}>
              <Text style={styles.notesLabel}>Notes:</Text>
              <Text style={styles.notesText}>• {notes}</Text>
            </View>
          )}

          {/* Info Source */}
          <Text style={styles.infoSource}>Info from {notes?.includes('Trip.com') ? 'Trip.com' : 'FlyAnywhere'}</Text>

          {/* Add Details Button for Incomplete Trips */}
          {isIncomplete && (
            <TouchableOpacity style={styles.addDetailsTextButton} onPress={onEditPress}>
              <Text style={styles.addDetailsTextButtonText}>Add details</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Advertisement Section */}
        {showAdvertisement && <AdvertisementCard />}
      </View>

      {/* Trip Menu Modal */}
      <TripMenuModal
        visible={showMenuModal}
        onClose={() => setShowMenuModal(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
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
    backgroundColor: '#E5E7EB',
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
    marginTop: -18, // Adjusted for smaller size
    width: 12,
    height: 12,
    borderRadius: 6,
    left: -4, // Adjusted position for smaller size
  },
  thirdDot: {
    bottom: 30,
    width: 12,
    height: 12,
    borderRadius: 6,
    left: -4, // Adjusted position for smaller size
  },
  activeDot: {
    backgroundColor: primaryColorDark,
  },
  inactiveDot: {
    backgroundColor: '#9CA3AF',
  },
  contentWrapper: {
    paddingLeft: 20,
  },
  tripCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    marginBottom: 16,
  },
  daysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  purpleCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: primaryColorDark,
    marginRight: 8,
  },
  daysText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  dateText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 2,
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
  routeCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9CA3AF',
    marginRight: 12,
  },
  routeText: {
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
  departureTime: {
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
  arrivalTime: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  nextDayIndicator: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  notesContainer: {
    marginBottom: 12,
  },
  notesLabel: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#6B7280',
  },
  infoSource: {
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