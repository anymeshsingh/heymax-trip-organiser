import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { primaryColorLight, primaryColorDark, errorForegroundColor, foregroundColorLight, foregroundColorDark } from '@repo/ui/appColors';
import { PrimaryButton } from '@repo/ui/primaryButton.native';

interface TermsModalProps {
  visible: boolean;
  onClose: () => void;
  partnerName: string;
  partnerLogo: any;
  logoBackgroundColor: string;
}

export const TermsModal: React.FC<TermsModalProps> = ({
  visible,
  onClose,
  partnerName,
  partnerLogo,
  logoBackgroundColor,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Terms & Exclusions</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={foregroundColorLight} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Partner Info */}
          <View style={styles.partnerSection}>
            <View style={[styles.partnerLogo, { backgroundColor: logoBackgroundColor }]}>
              <Image 
                source={partnerLogo}
                style={styles.partnerLogoImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.partnerInfo}>
              <Text style={styles.partnerName}>{partnerName}</Text>
              <View style={styles.partnerRewardContainer}>
                <Image 
                  source={require('@/assets/images/icons/heymax-icon.png')} 
                  style={styles.heymaxIcon}
                />
                <Text style={styles.partnerReward}>4.25/SGD on hotels</Text>
              </View>
            </View>
          </View>

          {/* Exclusions Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Exclusions</Text>
            
            <View style={styles.exclusionItem}>
              <View style={styles.exclusionIcon}>
                <Ionicons name="alert-circle" size={20} color={errorForegroundColor} />
              </View>
              <Text style={styles.exclusionText}>Max Miles are excluded for taxes ???</Text>
            </View>

            <View style={styles.exclusionItem}>
              <View style={styles.exclusionIcon}>
                <Ionicons name="alert-circle" size={20} color={errorForegroundColor} />
              </View>
              <Text style={styles.exclusionText}>Booking activities excluded</Text>
            </View>

            <View style={styles.exclusionItem}>
              <View style={styles.exclusionIcon}>
                <Ionicons name="alert-circle" size={20} color={errorForegroundColor} />
              </View>
              <Text style={styles.exclusionText}>Travel insurance excluded</Text>
            </View>
          </View>

          {/* Terms & Conditions Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Terms & Conditions</Text>
            
            <View style={styles.termsList}>
              <View style={styles.termItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.termText}>
                  As {partnerName} tracks in USD, there might be slight discrepancy due to conversion rates.
                </Text>
              </View>

              <View style={styles.termItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.termText}>
                  For {partnerName} purchases, Max Miles are awarded and calculated when bookings is confirmed and e-tickets are issued, i.e. not at point of purchase.
                </Text>
              </View>

              <View style={styles.termItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.termText}>
                  Max Miles calculated based on final price paid online, excluding taxes, fees and service charges.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.bottomSection}>
          <PrimaryButton
            title="Shop with Max"
            onPress={onClose}
            style={styles.shopButton}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: foregroundColorLight,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  partnerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  partnerLogo: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  partnerLogoImage: {
    width: '80%',
    height: '80%',
  },
  partnerInfo: {
    flex: 1,
  },
  partnerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: foregroundColorLight,
    marginBottom: 4,
  },
  partnerRewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heymaxIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  partnerReward: {
    fontSize: 16,
    color: primaryColorLight,
    fontWeight: '600',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: foregroundColorLight,
    marginBottom: 16,
  },
  exclusionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  exclusionIcon: {
    marginRight: 12,
  },
  exclusionText: {
    fontSize: 16,
    color: foregroundColorLight,
    flex: 1,
  },
  termsList: {
    marginTop: 8,
  },
  termItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: foregroundColorLight,
    marginTop: 8,
    marginRight: 12,
  },
  termText: {
    fontSize: 16,
    color: foregroundColorLight,
    lineHeight: 24,
    flex: 1,
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: 'white',
  },
  shopButton: {
    borderRadius: 25,
  },
});