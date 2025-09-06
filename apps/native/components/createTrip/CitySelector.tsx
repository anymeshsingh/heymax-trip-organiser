import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CityPickerModal } from '../modals';

interface CitySelectorProps {
  label: string;
  value?: string;
  placeholder: string;
  onValueChange: (value: string) => void;
  error?: string;
}

export const CitySelector: React.FC<CitySelectorProps> = ({
  label,
  value,
  placeholder,
  onValueChange,
  error,
}) => {
  const [showCityPicker, setShowCityPicker] = useState(false);

  const handleCitySelect = (city: any) => {
    onValueChange(city.name);
    setShowCityPicker(false);
  };

  const getCityPickerTitle = () => {
    return `Select ${label}`;
  };

  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TouchableOpacity 
        style={styles.inputContainer}
        onPress={() => setShowCityPicker(true)}
      >
        <Text style={[styles.cityText, !value && styles.placeholderCityText]}>
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#9CA3AF" style={styles.chevronIcon} />
      </TouchableOpacity>
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {/* City Picker Modal */}
      <CityPickerModal
        visible={showCityPicker}
        onClose={() => setShowCityPicker(false)}
        onSelect={handleCitySelect}
        title={getCityPickerTitle()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fieldGroup: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cityText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    paddingVertical: 8,
    flex: 1,
  },
  placeholderCityText: {
    color: '#9CA3AF',
    fontWeight: '400',
  },
  chevronIcon: {
    marginLeft: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    marginTop: 8,
    marginLeft: 0,
  },
});
