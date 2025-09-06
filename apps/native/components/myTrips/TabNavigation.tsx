import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { primaryColorLight } from '@repo/ui/appColors';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: Array<{
    key: string;
    label: string;
  }>;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  tabs,
}) => {
  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, activeTab === tab.key && styles.activeTab]}
          onPress={() => onTabChange(tab.key)}
        >
          <Text style={activeTab === tab.key ? styles.activeTabText : styles.inactiveTabText}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 24,
    marginTop: 16,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginHorizontal: 6,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: primaryColorLight,
  },
  activeTabText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  inactiveTabText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '500',
  },
});
