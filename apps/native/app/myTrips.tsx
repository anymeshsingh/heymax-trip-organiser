import { Text, View, StyleSheet, SafeAreaView, FlatList, ActivityIndicator } from "react-native";
import { backgroundColorLight, backgroundColorDark, primaryColorLight, foregroundColorDark, errorForegroundColor } from "@repo/ui/appColors";
import { router } from "expo-router";
import { useState, useMemo } from 'react';
import { TripCard, TabNavigation, EmptyState } from "@/components/myTrips";
import { useTrips, useDeleteTrip } from '../src/apis/trips';
import { AppHeader } from '../components/shared';

export default function MyTrips() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const { data: trips = [], isLoading, isError, error } = useTrips();
  const deleteTrip = useDeleteTrip();

  // Filter trips based on active tab
  const filteredTrips = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day

    return trips.filter(trip => {
      if (!trip.departureDate) return activeTab === 'upcoming'; // If no date, show in upcoming
      
      let departureDate: Date;
      
      if (trip.departureDate.includes('/')) {
        // Handle MM/DD/YYYY format
        const [month, day, year] = trip.departureDate.split('/');
        departureDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      } else if (trip.departureDate.includes('-')) {
        // Handle YYYY-MM-DD format
        departureDate = new Date(trip.departureDate);
      } else {
        // Fallback
        departureDate = new Date(trip.departureDate);
      }
      
      if (isNaN(departureDate.getTime())) {
        return activeTab === 'upcoming'; // If invalid date, show in upcoming
      }
      
      departureDate.setHours(0, 0, 0, 0); // Reset time to start of day
      
      if (activeTab === 'upcoming') {
        return departureDate >= today;
      } else {
        return departureDate < today;
      }
    });
  }, [trips, activeTab]);

  const handleDeleteTrip = (tripId: string) => {
    deleteTrip.mutate(tripId);
  };

  const tabs = [
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'past', label: 'Past trips' }
  ];

  const renderTripCard = ({ item, index }: { item: any, index: number }) => (
    <TripCard
      key={item.id}
      trip={item}
      showAdvertisement={activeTab === 'upcoming'}
      onEditPress={() => router.push(`/createTrip?tripId=${item.id}`)}
      onDeletePress={() => handleDeleteTrip(item.id!)}
    />
  );

  const renderEmptyState = () => (
    <EmptyState
      title={`No ${activeTab} trips`}
      description={`Your ${activeTab === 'upcoming' ? 'upcoming' : 'past'} trips will show up here when you book with HeyMax partners.`}
    />
  );

  if (isLoading) {
    return (
      <View style={[styles.outerContainer, styles.centerContent]}>
        <ActivityIndicator size="large" color={primaryColorLight} />
        <Text style={styles.loadingText}>Loading trips...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.outerContainer, styles.centerContent]}>
        <Text style={styles.errorText}>
          Error loading trips: {error?.message || 'Unknown error'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.outerContainer}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <AppHeader 
          title="My trips"
          showBackButton={false}
          rightAction={{
            icon: "add",
            onPress: () => router.push('/createTrip')
          }}
        />

        {/* Main Content Container */}
        <View style={styles.contentContainer}>
          {/* Tab Navigation */}
          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabs={tabs}
          />

          {/* Trips List */}
          <FlatList
            data={filteredTrips}
            renderItem={renderTripCard}
            keyExtractor={(item) => item.id!}
            ListEmptyComponent={renderEmptyState}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            windowSize={10}
            initialNumToRender={5}
          />
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
  contentContainer: {
    flex: 1,
    backgroundColor: backgroundColorLight,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: 8,
    marginBottom: -50,
    paddingBottom: 50,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: foregroundColorDark,
  },
  errorText: {
    fontSize: 16,
    color: errorForegroundColor,
    textAlign: 'center',
    paddingHorizontal: 24,
  }
});