import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { foregroundColorDark } from '@repo/ui/appColors';

interface FeatureItemProps {
  icon: ImageSourcePropType;
  title: string;
  description: string;
  iconBackgroundColor?: string;
}

export const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  description,
  iconBackgroundColor = '#4C63D2',
}) => {
  return (
    <View style={styles.featureItem}>
      <View style={[styles.featureIcon, { backgroundColor: iconBackgroundColor }]}>
        <Image style={styles.featureIconImage} source={icon} />
      </View>
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  featureItem: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    flexDirection: 'column',
  },
  featureIconImage: {
    width: "65%",
    height: undefined,
    aspectRatio: 1,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: foregroundColorDark,
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: foregroundColorDark,
    lineHeight: 20,
  },
});
