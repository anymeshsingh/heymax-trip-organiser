import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { foregroundColorDark } from '@repo/ui/appColors';
import { router } from 'expo-router';

interface AppHeaderProps {
  title: string;
  showBackButton?: boolean,
  onBackPress?: () => void;
  rightAction?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  };
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBackButton = true,
  onBackPress,
  rightAction,
}) => {
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.header}>
      {showBackButton ? (
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
        >
          <Ionicons name="arrow-back" size={24} color={foregroundColorDark} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButton} />
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      {rightAction ? (
        <TouchableOpacity 
          style={styles.rightButton}
          onPress={rightAction.onPress}
        >
          <Ionicons name={rightAction.icon} size={24} color={foregroundColorDark} />
        </TouchableOpacity>
      ) : (
        <View style={styles.rightButton} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: foregroundColorDark,
    textAlign: 'center',
  },
  rightButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
