import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TimePickerModal } from '../modals';
import { errorBackgroundColor, foregroundColorDark, foregroundColorLight, secondaryForegroundColor, tertiaryForegroundColor } from '@repo/ui/appColors';

interface TimeSelectorProps {
  label: string;
  value?: string;
  placeholder: string;
  onValueChange: (value: string) => void;
  error?: string;
}

export const TimeSelector: React.FC<TimeSelectorProps> = ({
  label,
  value,
  placeholder,
  onValueChange,
  error,
}) => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempTime, setTempTime] = useState(new Date());

  const handleTimeChange = (event: any, selectedTime: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
      if (selectedTime && event.type !== 'dismissed') {
        const formattedTime = selectedTime.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
        onValueChange(formattedTime);
      }
    } else if (Platform.OS === 'ios') {
      // For iOS, just update the temp time
      if (selectedTime) {
        setTempTime(selectedTime);
      }
    }
  };

  const confirmTimeSelection = () => {
    const formattedTime = tempTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
    onValueChange(formattedTime);
    setShowTimePicker(false);
  };

  const openTimePicker = () => {
    setTempTime(new Date());
    setShowTimePicker(true);
  };

  return (
    <View>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TouchableOpacity 
        style={styles.timeInputContainer}
        onPress={openTimePicker}
      >
        <Text style={[styles.timeText, !value && styles.placeholderText]}>
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color={secondaryForegroundColor} />
      </TouchableOpacity>
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {/* Time Picker Modal */}
      <TimePickerModal
        visible={showTimePicker}
        onClose={() => setShowTimePicker(false)}
        onConfirm={confirmTimeSelection}
        onChange={handleTimeChange}
        value={tempTime}
        title="Select Time"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fieldLabel: {
    fontSize: 16,
    color: foregroundColorLight,
    marginBottom: 8,
    fontWeight: '500',
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: foregroundColorDark,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: tertiaryForegroundColor,
  },
  timeText: {
    fontSize: 16,
    color: foregroundColorLight,
    fontWeight: '500',
  },
  placeholderText: {
    color: secondaryForegroundColor,
    fontWeight: '400',
  },
  errorText: {
    fontSize: 14,
    color: errorBackgroundColor,
    marginTop: 8,
    marginLeft: 0,
  },
});
