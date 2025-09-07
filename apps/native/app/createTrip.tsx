import { Text, View, StyleSheet, SafeAreaView, TextInput, ScrollView, ActivityIndicator } from "react-native";
import { primaryColorLight, backgroundColorDark, foregroundColorDark, backgroundColorLight, secondaryForegroundColor, foregroundColorLight, tertiaryForegroundColor } from "@repo/ui/appColors";
import { router, useLocalSearchParams } from "expo-router";
import { revalidateLogic, useForm } from '@tanstack/react-form';
import { useEffect } from 'react';
import { PrimaryButton } from "@repo/ui/primaryButton.native";
import { CitySelector, DateSelector, TimeSelector } from '../components/createTrip';
import { useTrip, useCreateTrip, useUpdateTrip } from '@repo/api-handler/trips';
import { AppHeader } from '../components/shared';
import { TripSchema, TripFormData } from '@repo/model/Trip.schema'

export default function CreateTrip() {
  const params = useLocalSearchParams();
  const isEditMode = !!params.tripId;
  const tripId = params.tripId as string;

  // React Query hooks
  const { data: existingTrip, isLoading } = useTrip(tripId);
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
        if (isEditMode) {
          await updateTrip.mutateAsync({ id: tripId, trip: value });
        } else {
          await createTrip.mutateAsync(value);
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
      form.setFieldValue('departureDate', existingTrip.departureDate || '');
      form.setFieldValue('departureTime', existingTrip.departureTime || '');
      form.setFieldValue('arrivalDate', existingTrip.arrivalDate || '');
      form.setFieldValue('arrivalTime', existingTrip.arrivalTime || '');
      form.setFieldValue('notes', existingTrip.notes || '');
    }
  }, [existingTrip, isEditMode]);

  if (isEditMode && isLoading) {
    return (
      <View style={[styles.outerContainer, styles.centerContent]}>
        <ActivityIndicator size="large" color={primaryColorLight} />
        <Text style={styles.loadingText}>Loading trip...</Text>
      </View>
    );
  }

  return (
    <View style={styles.outerContainer}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <AppHeader 
          title={isEditMode ? 'Edit flight information' : 'Add new trip'}
        />

        {/* Main Content Container */}
        <View style={styles.contentContainer}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            
            {/* Departure City */}
            <form.Field
              name="departure"
              validators={{
                onChange: ({ value }) => {
                  const result = TripSchema.shape.departure.safeParse(value);
                  return result.success ? undefined : result.error.issues[0]?.message;
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
                  error={field.state.meta.errors.length > 0 ? field.state.meta.errors.join(", ") : undefined}
                />
              )}
            </form.Field>

            {/* Departure Date and Time */}
            <View style={styles.rowContainer}>
              <View style={[styles.fieldGroup, styles.halfWidth]}>
                <form.Field
                  name="departureDate"
                  validators={{
                    onChange: ({ value }) => {
                      const result = TripSchema.shape.departureDate.safeParse(value);
                      return result.success ? undefined : result.error.issues[0]?.message;
                    },
                  }}
                >
                  {(field) => (
                    <DateSelector
                      label="Departure date"
                      value={field.state.value}
                      placeholder="Select date"
                      onValueChange={field.handleChange}
                      error={field.state.meta.errors.length > 0 ? field.state.meta.errors[0]?.toString() : undefined}
                    />
                  )}
                </form.Field>
              </View>

              <View style={[styles.fieldGroup, styles.halfWidth]}>
                <form.Field
                  name="departureTime"
                  validators={{
                    onChange: ({ value }) => {
                      const result = TripSchema.shape.departureTime.safeParse(value);
                      return result.success ? undefined : result.error.issues[0]?.message;
                    },
                  }}
                >
                  {(field) => (
                    <TimeSelector
                      label="Departure time"
                      value={field.state.value}
                      placeholder="Select time"
                      onValueChange={field.handleChange}
                      error={field.state.meta.errors.length > 0 ? field.state.meta.errors[0]?.toString() : undefined}
                    />
                  )}
                </form.Field>
              </View>
            </View>

            {/* Arrival City */}
            <form.Field
              name="arrival"
              validators={{
                onChange: ({ value }) => {
                  const result = TripSchema.shape.arrival.safeParse(value);
                  return result.success ? undefined : result.error.issues[0]?.message;
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
                  error={field.state.meta.errors.length > 0 ? (field.state.meta.errors[0]?.toString())  : undefined}
                />
              )}
            </form.Field>

            {/* Arrival Date and Time */}
            <View style={styles.rowContainer}>
              <View style={[styles.fieldGroup, styles.halfWidth]}>
                <form.Field name="arrivalDate">
                  {(field) => (
                    <DateSelector
                      label="Arrival date"
                      value={field.state.value}
                      placeholder="Select date"
                      onValueChange={field.handleChange}
                      error={field.state.meta.errors.length > 0 ? (field.state.meta.errors[0]?.message) : undefined}
                    />
                  )}
                </form.Field>
              </View>

              <View style={[styles.fieldGroup, styles.halfWidth]}>
                <form.Field name="arrivalTime">
                  {(field) => (
                    <TimeSelector
                      label="Arrival time"
                      value={field.state.value}
                      placeholder="Select time"
                      onValueChange={field.handleChange}
                      error={field.state.meta.errors.length > 0 ? field.state.meta.errors[0]?.message : undefined}
                    />
                  )}
                </form.Field>
              </View>
            </View>

            {/* Notes */}
            <View style={styles.fieldGroup}>
              <form.Field name="notes">
                {(field) => (
                    <View>
                        <Text style={styles.fieldLabel}>Notes (Optional)</Text>
                        <TextInput
                          style={styles.notesInput}
                          placeholder="Write your notes here..."
                          placeholderTextColor={secondaryForegroundColor}
                          multiline
                          numberOfLines={6}
                          value={field.state.value}
                          onChangeText={field.handleChange}
                          onBlur={field.handleBlur}
                          textAlignVertical="top"
                        />
                    </View>
                )}
              </form.Field>
            </View>

          </ScrollView>

          {/* Bottom Button */}
          <View style={styles.bottomSection}>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting, state.isValid]}
            >
              {([_, isSubmitting, isValid]) => (
                <PrimaryButton
                  title={
                    createTrip.isPending || updateTrip.isPending
                      ? "Saving..." 
                      : (isEditMode ? "Update trip" : "Save changes")
                  }
                  dark={true}
                  onPress={form.handleSubmit}
                  disabled={isSubmitting || !isValid || createTrip.isPending || updateTrip.isPending}
                  style={styles.saveButton}
                />
              )}
            </form.Subscribe>
          </View>
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  fieldGroup: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 16,
    color: foregroundColorLight,
    marginBottom: 8,
    fontWeight: '500',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  halfWidth: {
    width: '48%',
    marginBottom: 0,
  },
  notesInput: {
    backgroundColor: foregroundColorDark,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: tertiaryForegroundColor,
    fontSize: 16,
    color: foregroundColorLight,
    minHeight: 120,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingTop: 14,
  },
  saveButton: {
    borderRadius: 25,
    width: '100%',
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
});