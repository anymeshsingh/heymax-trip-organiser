import { foregroundColorLight, secondaryForegroundColor } from '@repo/ui/appColors';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface EmptyStateProps {
  title: string;
  description: string;
  imagePath?: any;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  imagePath = require('@/assets/images/empty-page-illustration.png'),
}) => {
  return (
    <View style={styles.emptyStateContainer}>
      <View style={styles.textContent}>
        <Image 
          source={imagePath}
          resizeMode="contain"
          style={styles.emptyImage}
        />
        <Text style={styles.emptyTitle}>{title}</Text>
        <Text style={styles.emptyDescription}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingTop: 80,
  },
  textContent: {
    alignItems: 'center',
  },
  emptyImage: {
    marginBottom: 20,
    width: 200,
    height: 200,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: foregroundColorLight,
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: 16,
    color: secondaryForegroundColor,
    textAlign: 'center',
    lineHeight: 22,
  },
});
