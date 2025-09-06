import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TripMenuModalProps {
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const TripMenuModal: React.FC<TripMenuModalProps> = ({
  visible,
  onClose,
  onEdit,
  onDelete,
}) => {
  const handleEdit = () => {
    onClose();
    onEdit();
  };

  const handleDelete = () => {
    onClose();
    onDelete();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={styles.modalContainer}>
          <SafeAreaView>
            {/* Content */}
            <View style={styles.content}>
              <TouchableOpacity style={styles.menuItem} onPress={handleEdit}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="create-outline" size={24} color="#1F2937" />
                  <Text style={styles.menuItemText}>Edit trip information</Text>
                </View>
              </TouchableOpacity>
              
              <View style={styles.separator} />
              
              <TouchableOpacity style={styles.menuItem} onPress={handleDelete}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="trash-outline" size={24} color="#EF4444" />
                  <Text style={[styles.menuItemText, styles.deleteText]}>Delete</Text>
                </View>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 16,
    fontWeight: '500',
  },
  deleteText: {
    color: '#EF4444',
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 8,
  },
});
