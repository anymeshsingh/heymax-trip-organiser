import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { backgroundColorDark, foregroundColorDark, backgroundColorLight } from "@repo/ui/appColors";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { revalidateLogic, useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { PrimaryButton } from "@repo/ui/primaryButton.native";
import { CitySelector, DateSelector, TimeSelector } from '../components/createTrip';

const tripSchema = z.object({
  departure: z.string().min(1, 'Departure city is required'),
  arrival: z.string().min(1, 'Arrival city is required'),
  departureDate: z.string().min(1, 'Required'),
  departureTime: z.string().min(1, 'Required'),
  arrivalDate: z.string().optional(),
  arrivalTime: z.string().optional(),
  notes: z.string().optional(),
});

type TripFormData = z.infer<typeof tripSchema>;

export default function CreateTrip() {
  const params = useLocalSearchParams();
  const isEditMode = !!params.tripId;

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
      onDynamic: tripSchema,
    },
    onSubmit: async ({ value }) => {
      console.log('Form submitted:', value);
      console.log('Trip ID:', params.tripId);
      if (isEditMode) {
        // Update existing trip with params.tripId
      } else {
        // Create new trip
      }
      router.back();
    },
  });

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
          <Text style={styles.headerTitle}>
            {isEditMode ? 'Edit flight information' : 'Add new trip'}
          </Text>
          <View style={styles.headerRight} />
        </View>

        {/* Main Content Container */}
        <View style={styles.contentContainer}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            
            {/* Departure City */}
            <form.Field
              name="departure"
                validators={{
                onChange: ({ value }) => {
                    const result = tripSchema.shape.departure.safeParse(value);
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
                      const result = tripSchema.shape.departureDate.safeParse(value);
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
                      const result = tripSchema.shape.departureTime.safeParse(value);
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
                  const result = tripSchema.shape.arrival.safeParse(value);
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
                          placeholderTextColor="#9CA3AF"
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
                  title={isSubmitting ? "Saving..." : "Save changes"}
                  dark={true}
                  onPress={form.handleSubmit}
                  disabled={isSubmitting || !isValid}
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
    color: foregroundColorDark,
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
    color: '#6B7280',
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
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 16,
    color: '#1F2937',
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
});