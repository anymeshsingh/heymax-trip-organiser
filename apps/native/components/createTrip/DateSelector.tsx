import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DatePickerModal } from '../modals';

interface DateSelectorProps {
  label: string;
  value?: string;
  placeholder: string;
  onValueChange: (value: string) => void;
  error?: string;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  label,
  value,
  placeholder,
  onValueChange,
  error,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
      if (selectedDate && event.type !== 'dismissed') {
        const formattedDate = selectedDate.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric'
        });
        onValueChange(formattedDate);
      }
    } else if (Platform.OS === 'ios') {
      // For iOS, just update the temp date
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    }
  };

  const confirmDateSelection = () => {
    const formattedDate = tempDate.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
    onValueChange(formattedDate);
    setShowDatePicker(false);
  };

  const openDatePicker = () => {
    setTempDate(new Date());
    setShowDatePicker(true);
  };

  return (
    <View>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TouchableOpacity 
        style={styles.dateInputContainer}
        onPress={openDatePicker}
      >
        <Text style={[styles.dateText, !value && styles.placeholderText]}>
          {value || placeholder}
        </Text>
        <Ionicons name="calendar-outline" size={20} color="#9CA3AF" />
      </TouchableOpacity>
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {/* Date Picker Modal */}
      <DatePickerModal
        visible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onConfirm={confirmDateSelection}
        onChange={handleDateChange}
        value={tempDate}
        title="Select Date"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fieldLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: '500',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dateText: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  placeholderText: {
    color: '#9CA3AF',
    fontWeight: '400',
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    marginTop: 8,
    marginLeft: 0,
  },
});
