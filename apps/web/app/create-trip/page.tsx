"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IoSync } from 'react-icons/io5';
import { revalidateLogic, useForm } from '@tanstack/react-form';
import { AppHeader } from '../../src/components/shared/AppHeader';
import { CitySelector } from '../../src/components/shared/CitySelector';
import { useTrip, useCreateTrip, useUpdateTrip } from '@repo/api-handler/trips';
import { TripSchema, TripFormData } from '@repo/model/Trip.schema'

// Date conversion utilities
const convertToHTMLDateFormat = (dateString?: string): string => {
	if (!dateString) return '';
	
	// If already in yyyy-MM-dd format, return as is
	if (dateString.includes('-') && dateString.length === 10) {
		return dateString;
	}
	
	// Convert MM/dd/yyyy to yyyy-MM-dd
	if (dateString.includes('/')) {
		const [month, day, year] = dateString.split('/');
		if (month && day && year) {
			return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
		}
	}
	
	return '';
};

const convertFromHTMLDateFormat = (dateString?: string): string => {
	if (!dateString) return '';
	
	// Convert yyyy-MM-dd to MM/dd/yyyy
	if (dateString.includes('-') && dateString.length === 10) {
		const [year, month, day] = dateString.split('-');
		if (year && month && day) {
			return `${month}/${day}/${year}`;
		}
	}
	
	return dateString;
};

export default function CreateTrip() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const tripId = searchParams.get('tripId');
	const isEditMode = !!tripId;

	// React Query hooks
	const { data: existingTrip, isLoading } = useTrip(tripId || '');
	const createTrip = useCreateTrip();
	const updateTrip = useUpdateTrip();

	const form = useForm({
		defaultValues: {
			departure: '',
			arrival: '',
			departureDate: '',
			departureTime: '',
			arrivalDate: '',
			arrivalTime: '',
			notes: '',
		} as TripFormData,
		validationLogic: revalidateLogic(),
		validators: {
			onDynamic: TripSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				// Convert dates back to MM/dd/yyyy format before submitting
				const submitValue = {
					...value,
					departureDate: convertFromHTMLDateFormat(value.departureDate),
					arrivalDate: convertFromHTMLDateFormat(value.arrivalDate),
				};
				
				if (isEditMode) {
					await updateTrip.mutateAsync({ id: tripId!, trip: submitValue });
				} else {
					await createTrip.mutateAsync(submitValue);
				}
				router.back();
			} catch (error) {
				console.error('Error saving trip:', error);
			}
		},
	});

	// Load existing trip data when available
	useEffect(() => {
		if (isEditMode && existingTrip) {
			form.setFieldValue('departure', existingTrip.departure || '');
			form.setFieldValue('arrival', existingTrip.arrival || '');
			form.setFieldValue('departureDate', convertToHTMLDateFormat(existingTrip.departureDate) || '');
			form.setFieldValue('departureTime', existingTrip.departureTime || '');
			form.setFieldValue('arrivalDate', convertToHTMLDateFormat(existingTrip.arrivalDate) || '');
			form.setFieldValue('arrivalTime', existingTrip.arrivalTime || '');
			form.setFieldValue('notes', existingTrip.notes || '');
		}
	}, [existingTrip, isEditMode, form]);

	if (isEditMode && isLoading) {
		return (
			<div className="h-screen flex justify-center items-center bg-background-light">
				<div className="text-center">
					<IoSync
						size={48}
						className="animate-spin text-primary-light mx-auto mb-4"
					/>
					<span className="text-base text-foreground-dark">
						Loading trip...
					</span>
				</div>
			</div>
		);
	}

	return (
		<div className="h-screen flex justify-center bg-background-dark overflow-hidden">
			<div className="flex flex-col w-full max-w-md h-full">
				<div className="bg-background-dark flex-shrink-0">
					{/* Header */}
					<AppHeader
						title={
							isEditMode
								? 'Edit flight information'
								: 'Add new trip'
						}
						showBackButton={true}
					/>
				</div>

				{/* Main Content Container */}
				<div className="flex-1 bg-background-light rounded-t-2xl mt-2 flex flex-col min-h-0">
					{/* Scrollable Form Content */}
					<div className="flex-1 overflow-y-auto px-6 pt-6 scrollbar-hide">
						{/* Departure City */}
						<form.Field
							name="departure"
							validators={{
								onChange: ({ value }) => {
									const result = TripSchema.shape.departure.safeParse(value);
									return result.success
										? undefined
										: result.error.issues[0]?.message;
								},
							}}
						>
							{(field) => (
								<CitySelector
									label="Departure city"
									value={field.state.value}
									placeholder="Select departure city"
									onValueChange={(value) => {
										field.handleChange(value);
										setTimeout(() => {
											form.validateAllFields('change');
										}, 100);
									}}
									error={field.state.meta.errors.length > 0 ? field.state.meta.errors[0]?.toString() : undefined}
								/>
							)}
						</form.Field>

						{/* Departure Date and Time */}
						<div className="flex justify-between mb-6">
							<div className="w-[48%]">
								<form.Field
									name="departureDate"
									validators={{
										onChange: ({ value }) => {
											// Validate the converted date format
											const convertedValue = convertFromHTMLDateFormat(value);
											const result = TripSchema.shape.departureDate.safeParse(convertedValue);
											return result.success
												? undefined
												: result.error.issues[0]?.message;
										},
									}}
								>
									{(field) => (
										<div>
											<label className="block text-base text-foreground-light font-medium mb-2">
												Departure date
											</label>
											<input
												type="date"
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												className={`w-full bg-white rounded-xl px-4 py-3 border text-base text-foreground-light ${
													field.state.meta.errors.length > 0
														? 'border-error-foreground'
														: 'border-tertiary-foreground'
												}`}
											/>
											{field.state.meta.errors.length > 0 && (
												<span className="text-sm text-error-foreground mt-1 block">
													{field.state.meta.errors[0]?.toString()}
												</span>
											)}
										</div>
									)}
								</form.Field>
							</div>

							<div className="w-[48%]">
								<form.Field
									name="departureTime"
									validators={{
										onChange: ({ value }) => {
											const result = TripSchema.shape.departureTime.safeParse(value);
											return result.success
												? undefined
												: result.error.issues[0]?.message;
										},
									}}
								>
									{(field) => (
										<div>
											<label className="block text-base text-foreground-light font-medium mb-2">
												Departure time
											</label>
											<input
												type="time"
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												className={`w-full bg-white rounded-xl px-4 py-3 border text-base text-foreground-light ${
													field.state.meta.errors.length > 0
														? 'border-error-foreground'
														: 'border-tertiary-foreground'
												}`}
											/>
											{field.state.meta.errors.length > 0 && (
												<span className="text-sm text-error-foreground mt-1 block">
													{field.state.meta.errors[0]?.toString()}
												</span>
											)}
										</div>
									)}
								</form.Field>
							</div>
						</div>

						{/* Arrival City */}
						<form.Field
							name="arrival"
							validators={{
								onChange: ({ value }) => {
									const result = TripSchema.shape.arrival.safeParse(value);
									return result.success
										? undefined
										: result.error.issues[0]?.message;
								},
							}}
						>
							{(field) => (
								<CitySelector
									label="Arrival city"
									value={field.state.value}
									placeholder="Select arrival city"
									onValueChange={(value) => {
										field.handleChange(value);
										setTimeout(() => {
											form.validateAllFields('change');
										}, 100);
									}}
									error={field.state.meta.errors.length > 0 ? field.state.meta.errors[0]?.toString() : undefined}
								/>
							)}
						</form.Field>

						{/* Arrival Date and Time */}
						<div className="flex justify-between mb-6">
							<div className="w-[48%]">
								<form.Field name="arrivalDate">
									{(field) => (
										<div>
											<label className="block text-base text-foreground-light font-medium mb-2">
												Arrival date
											</label>
											<input
												type="date"
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												className="w-full bg-white rounded-xl px-4 py-3 border border-tertiary-foreground text-base text-foreground-light"
											/>
											{field.state.meta.errors.length > 0 && (
												<span className="text-sm text-error-foreground mt-1 block">
													{field.state.meta.errors[0]?.message}
												</span>
											)}
										</div>
									)}
								</form.Field>
							</div>

							<div className="w-[48%]">
								<form.Field name="arrivalTime">
									{(field) => (
										<div>
											<label className="block text-base text-foreground-light font-medium mb-2">
												Arrival time
											</label>
											<input
												type="time"
												value={field.state.value}
												onChange={(e) => field.handleChange(e.target.value)}
												onBlur={field.handleBlur}
												className="w-full bg-white rounded-xl px-4 py-3 border border-tertiary-foreground text-base text-foreground-light"
											/>
											{field.state.meta.errors.length > 0 && (
												<span className="text-sm text-error-foreground mt-1 block">
													{field.state.meta.errors[0]?.message}
												</span>
											)}
										</div>
									)}
								</form.Field>
							</div>
						</div>

						{/* Notes */}
						<div className="mb-6">
							<form.Field name="notes">
								{(field) => (
									<div>
										<label className="block text-base text-foreground-light font-medium mb-2">
											Notes (Optional)
										</label>
										<textarea
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
											placeholder="Write your notes here..."
											rows={6}
											className="w-full bg-white rounded-xl px-4 py-3 border border-tertiary-foreground text-base text-foreground-light placeholder:text-secondary-foreground resize-none"
										/>
									</div>
								)}
							</form.Field>
						</div>
					</div>

					{/* Bottom Button */}
					<div className="px-6 pt-3.5 pb-6">
						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting, state.isValid]}
						>
							{([_, isSubmitting, isValid]) => (
								<button
									onClick={form.handleSubmit}
									disabled={
										isSubmitting ||
										!isValid ||
										createTrip.isPending ||
										updateTrip.isPending
									}
									className={`w-full py-3 rounded-full text-base font-semibold transition-opacity ${
										isSubmitting ||
										!isValid ||
										createTrip.isPending ||
										updateTrip.isPending
											? 'bg-gray-300 text-gray-500 cursor-not-allowed'
											: 'bg-primary-dark text-white hover:opacity-90'
									}`}
								>
									{createTrip.isPending || updateTrip.isPending
										? 'Saving...'
										: isEditMode
										? 'Update trip'
										: 'Save changes'}
								</button>
							)}
						</form.Subscribe>
					</div>
				</div>
			</div>
		</div>
	);
}