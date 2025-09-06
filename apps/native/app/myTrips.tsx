import { Text, View, Image, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { backgroundColorDark, foregroundColorDark, backgroundColorLight, primaryColorLight } from "@repo/ui/appColors";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { TripCard } from "@/components/myTrips";

const sampleTrips = [
  {
    id: '1',
    departure: "Singapore, SIN",
    arrival: "Hong Kong, HKG",
    departureDate: "2025-09-09",
    departureTime: "16:05",
    arrivalDate: "2025-09-11",
    arrivalTime: undefined,
    notes: "Booking reference: Booking ref: 5AJSDH"
  },
  {
    id: '2',
    departure: "Singapore, SIN",
    arrival: "Hong Kong, HKG",
    departureDate: "2025-09-09",
    departureTime: "16:05",
    arrivalDate: "2025-09-09",
    arrivalTime: "21:10",
    notes: "Booking reference: Booking ref: 5AJSDH"
  },
  {
    id: '3',
    departure: "Singapore, SIN",
    arrival: "Hong Kong, HKG",
    departureDate: "2025-09-09",
    departureTime: "16:05",
    arrivalDate: "2025-09-09",
    arrivalTime: "21:10",
    notes: "Booking reference: Booking ref: 5AJSDH"
  }
];

export default function MyTrips() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [trips, setTrips] = useState(sampleTrips);

  const handleDeleteTrip = (tripId: string) => {
    setTrips(prevTrips => prevTrips.filter(trip => trip.id !== tripId));
  };

  return (
    <View style={styles.outerContainer}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={foregroundColorDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My trips</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => {
              // For creating new trip (no tripId)
              router.push('/createtrip');
              
              // For editing existing trip (with tripId)
            //   router.push('/createtrip?tripId=123');
              // or using object syntax:
              // router.push({ pathname: '/createtrip', params: { tripId: '123' } });
            }}
          >
            <Ionicons name="add" size={24} color={foregroundColorDark} />
          </TouchableOpacity>
        </View>

        {/* Main Content Container */}
        <View style={styles.contentContainer}>
          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
              onPress={() => setActiveTab('upcoming')}
            >
              <Text style={activeTab === 'upcoming' ? styles.activeTabText : styles.inactiveTabText}>
                Upcoming
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'past' && styles.activeTab]}
              onPress={() => setActiveTab('past')}
            >
              <Text style={activeTab === 'past' ? styles.activeTabText : styles.inactiveTabText}>
                Past trips
              </Text>
            </TouchableOpacity>
          </View>

          {/* Empty State */}
          {/* <View style={styles.emptyStateContainer}>
            <View style={styles.textContent}>
              <Image 
                source={require('@/assets/images/empty-page-illustration.png')}
                resizeMode="contain"
                style={styles.emptyImage}
              />
              <Text style={styles.emptyTitle}>No trips yet</Text>
              <Text style={styles.emptyDescription}>
                Your {activeTab === 'upcoming' ? 'upcoming' : 'past'} trips will show up here when you book with HeyMax partners.
              </Text>
            </View>
          </View> */}
          <ScrollView>
            {trips.map((trip, index) => (
              <TripCard
                key={trip.id}
                trip={trip}
                showAdvertisement={index === 0}
                onEditPress={() => router.push(`/createtrip?tripId=${trip.id}`)}
                onDeletePress={() => handleDeleteTrip(trip.id!)}
              />
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: backgroundColorLight,
  },
  container: {
    flex: 1,
    backgroundColor: backgroundColorDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginTop: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: foregroundColorDark,
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  addButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: backgroundColorLight,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: 8,
    marginBottom: -50,
    paddingBottom: 50,
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 24,
    marginTop: 16,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginHorizontal: 6,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: primaryColorLight,
  },
  activeTabText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  inactiveTabText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '500',
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  textContent: {
    alignItems: 'center',
  },
  emptyImage: {
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
});