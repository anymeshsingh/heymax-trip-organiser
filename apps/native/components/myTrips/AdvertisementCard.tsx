import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { foregroundColorDark, foregroundColorLight, primaryColorLight, secondaryForegroundColor } from '@repo/ui/appColors';
import { TermsModal } from '../modals/TermsModal';

export const AdvertisementCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hotels' | 'activities'>('hotels');
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<{
    name: string;
    logo: any;
    backgroundColor: string;
  } | null>(null);

  const partners = [
    {
      name: 'Trip.com',
      logo: require('@/assets/images/ads/ad1.png'),
      backgroundColor: '#2446FF',
      hasBestDeal: true,
    },
    {
      name: 'Klook',
      logo: require('@/assets/images/ads/ad2.png'),
      backgroundColor: '#4D40CC',
      hasBestDeal: false,
    },
    {
      name: 'Traveloka',
      logo: require('@/assets/images/ads/ad3.png'),
      backgroundColor: '#008EFF',
      hasBestDeal: false,
    },
  ];

  const handlePartnerPress = (partner: typeof partners[0]) => {
    setSelectedPartner(partner);
    setShowTermsModal(true);
  };

  return (
    <View style={styles.advertisementContainer}>
      <Text style={styles.adTitle}>Enjoy exclusive upsizes</Text>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'hotels' && styles.activeTab]}
          onPress={() => setActiveTab('hotels')}
        >
          <Text style={activeTab === 'hotels' ? styles.activeTabText : styles.inactiveTabText}>
            Hotels
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'activities' && styles.activeTab]}
          onPress={() => setActiveTab('activities')}
        >
          <Text style={activeTab === 'activities' ? styles.activeTabText : styles.inactiveTabText}>
            Activities
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.partnersContainer}>
        {partners.map((partner, index) => (
          <TouchableOpacity
            key={index}
            style={styles.partnerCard}
            onPress={() => handlePartnerPress(partner)}
          >
            <View style={[styles.partnerLogo, { backgroundColor: partner.backgroundColor }]}>
              <Image 
                source={partner.logo}
                style={styles.partnerLogoImage}
                resizeMode="contain"
              />
            </View>
            {partner.hasBestDeal && (
              <View style={styles.bestDealBadge}>
                <Text style={styles.bestDealText}>Best deal</Text>
              </View>
            )}
            <Text style={styles.partnerName}>{partner.name}</Text>
            <View style={styles.partnerPriceContainer}>
              <Image 
                source={require('@/assets/images/icons/heymax-icon.png')} 
                style={styles.heymaxIcon}
              />
              <Text style={styles.partnerPrice}>4.25/SGD</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Terms Modal */}
      {selectedPartner && (
        <TermsModal
          visible={showTermsModal}
          onClose={() => setShowTermsModal(false)}
          partnerName={selectedPartner.name}
          partnerLogo={selectedPartner.logo}
          logoBackgroundColor={selectedPartner.backgroundColor}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  advertisementContainer: {
    backgroundColor: '#FEF5E5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  adTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9F690C',
    marginBottom: 12,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: foregroundColorDark,
  },
  activeTab: {
    backgroundColor: primaryColorLight,
  },
  activeTabText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  inactiveTabText: {
    color: secondaryForegroundColor,
    fontSize: 14,
    fontWeight: '500',
  },
  partnersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  partnerCard: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  partnerLogo: {
    width: 80,
    height: 64,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  partnerLogoImage: {
    width: '80%',
    height: '80%',
  },
  bestDealBadge: {
    backgroundColor: '#00A15E',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    position: 'absolute',
    top: -4,
    left: -4,
  },
  bestDealText: {
    color: foregroundColorDark,
    fontSize: 10,
    fontWeight: '600',
  },
  partnerName: {
    fontSize: 14,
    fontWeight: '600',
    color: foregroundColorLight,
    marginBottom: 2,
  },
  partnerPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heymaxIcon: {
    width: 12,
    height: 12,
    marginRight: 4,
  },
  partnerPrice: {
    fontSize: 12,
    color: primaryColorLight,
  },
});
