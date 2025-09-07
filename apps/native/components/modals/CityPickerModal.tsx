import React from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { foregroundColorLight, secondaryForegroundColor, tertiaryForegroundColor } from '@repo/ui/appColors';

const SOUTHEAST_ASIAN_CITIES = [
  { code: 'SIN', city: 'Singapore', name: 'Singapore, SIN' },
  { code: 'KUL', city: 'Kuala Lumpur', name: 'Kuala Lumpur, KUL' },
  { code: 'BKK', city: 'Bangkok', name: 'Bangkok, BKK' },
  { code: 'HKG', city: 'Hong Kong', name: 'Hong Kong, HKG' },
  { code: 'MNL', city: 'Manila', name: 'Manila, MNL' },
  { code: 'CGK', city: 'Jakarta', name: 'Jakarta, CGK' },
  { code: 'HAN', city: 'Hanoi', name: 'Hanoi, HAN' },
  { code: 'SGN', city: 'Ho Chi Minh City', name: 'Ho Chi Minh City, SGN' },
  { code: 'REP', city: 'Siem Reap', name: 'Siem Reap, REP' },
  { code: 'RGN', city: 'Yangon', name: 'Yangon, RGN' },
  { code: 'VTE', city: 'Vientiane', name: 'Vientiane, VTE' },
  { code: 'BWN', city: 'Bandar Seri Begawan', name: 'Bandar Seri Begawan, BWN' },
];

interface City {
  code: string;
  city: string;
  name: string;
}

interface CityPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (city: City) => void;
//   cities: City[];
  title: string;
}

export const CityPickerModal: React.FC<CityPickerModalProps> = ({
  visible,
  onClose,
  onSelect,
  title,
}) => {
  const renderCityItem = ({ item }: { item: City }) => (
    <TouchableOpacity
      style={styles.cityPickerItem}
      onPress={() => onSelect(item)}
    >
      <Text style={styles.cityPickerItemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={onClose}
            >
              <Ionicons name="close" size={24} color={foregroundColorLight} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={SOUTHEAST_ASIAN_CITIES}
            renderItem={renderCityItem}
            keyExtractor={(item) => item.code}
            style={styles.cityList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: tertiaryForegroundColor,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: foregroundColorLight,
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityList: {
    paddingHorizontal: 24,
  },
  cityPickerItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: tertiaryForegroundColor,
  },
  cityPickerItemText: {
    fontSize: 16,
    color: foregroundColorLight,
    fontWeight: '500',
  },
});
