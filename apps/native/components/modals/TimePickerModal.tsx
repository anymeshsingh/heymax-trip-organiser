import React from 'react';
import { Modal, View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { primaryColorDark } from '@repo/ui/appColors';

interface TimePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onChange: (event: any, time: Date | undefined) => void;
  value: Date;
  title?: string;
}

export const TimePickerModal: React.FC<TimePickerModalProps> = ({
  visible,
  onClose,
  onConfirm,
  onChange,
  value,
  title = "Select Time",
}) => {
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
            <TouchableOpacity
              style={styles.modalActionButton}
              onPress={onClose}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity
              style={styles.modalActionButton}
              onPress={onConfirm}
            >
              <Text style={styles.modalSelectText}>Select</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.pickerContainer}>
            <DateTimePicker
              value={value}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChange}
            />
          </View>
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
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  modalActionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  modalCancelText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  modalSelectText: {
    fontSize: 16,
    color: primaryColorDark,
    fontWeight: '600',
  },
  pickerContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
