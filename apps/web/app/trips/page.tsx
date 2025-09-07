"use client";

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { IoSync } from 'react-icons/io5';
import { AppHeader } from '../../src/components/shared/AppHeader';
import { TripCard, TabNavigation, EmptyState } from '../../src/components/myTrips';
import { useTrips, useDeleteTrip } from '../../src/apis/trips';

export default function Trips() {
	const [activeTab, setActiveTab] = useState('upcoming');
	const router = useRouter();
	const { data: trips = [], isLoading, isError, error } = useTrips();
	const deleteTrip = useDeleteTrip();

	// Filter trips based on active tab
	const filteredTrips = useMemo(() => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		return trips.filter(trip => {
			if (!trip.departureDate) return activeTab === 'upcoming';

			let departureDate: Date;

			if (trip.departureDate.includes('/')) {
				const [month, day, year] = trip.departureDate.split('/');
				departureDate = new Date(parseInt(year!), parseInt(month!) - 1, parseInt(day!));
			} else if (trip.departureDate.includes('-')) {
				departureDate = new Date(trip.departureDate);
			} else {
				departureDate = new Date(trip.departureDate);
			}

			if (isNaN(departureDate.getTime())) {
				return activeTab === 'upcoming';
			}

			departureDate.setHours(0, 0, 0, 0);

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

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-screen bg-background-light">
				<div className="text-center">
					<IoSync size={48} className="animate-spin text-primary-light mx-auto mb-4" />
					<span className="text-base text-foreground-dark">Loading trips...</span>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex justify-center items-center min-h-screen bg-background-light">
				<span className="text-base text-error-foreground text-center px-6">
					Error loading trips: {error?.message || 'Unknown error'}
				</span>
			</div>
		);
	}

	return (
		<div className="h-screen flex justify-center bg-background-dark overflow-hidden">
			<div className="flex flex-col w-full max-w-md h-full">
				<div className="bg-background-dark flex-shrink-0">
					{/* Header */}
					<AppHeader
						title="My trips"
						showBackButton={false}
						rightAction={{
							icon: "add",
							onPress: () => router.push('/create-trip')
						}}
					/>
				</div>

				{/* Main Content Container */}
				<div className="flex-1 bg-background-light rounded-t-2xl mt-2 flex flex-col min-h-0">
					{/* Tab Navigation */}
					<div className="flex-shrink-0">
						<TabNavigation
							activeTab={activeTab}
							onTabChange={setActiveTab}
							tabs={tabs}
						/>
					</div>

					{/* Trips List - Only this section is scrollable */}
					<div className="flex-1 overflow-y-auto min-h-0 scrollbar-hide">
						{filteredTrips.length === 0 ? (
							<EmptyState
								title={`No ${activeTab} trips`}
								description={`Your ${activeTab === 'upcoming' ? 'upcoming' : 'past'} trips will show up here when you book with HeyMax partners.`}
							/>
						) : (
							<div className="space-y-2 pb-4">
								{filteredTrips.map((trip, index) => (
									<TripCard
										key={trip.id}
										trip={trip}
										showAdvertisement={activeTab === 'upcoming'}
										onEditPress={() => router.push(`/create-trip?tripId=${trip.id}`)}
										onDeletePress={() => handleDeleteTrip(trip.id!)}
									/>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
