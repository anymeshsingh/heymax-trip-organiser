import { Text, View, Image, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { PrimaryButton } from "@repo/ui/primaryButton.native"
import { primaryColorDark, backgroundColorDark, foregroundColorDark } from "@repo/ui/appColors"
import { router } from "expo-router";
import { FeatureItem } from '../components/shared';

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} scrollEnabled={true}>

        {/* Airline Logos Grid - 4 in first row, 3 in second row */}
        <View style={styles.logoGrid}>
          <View style={styles.logoRow}>
            <View style={[styles.logoContainer, styles.airAsiaLogo]}>
              <Image style={styles.logoImage} source={require('@/assets/images/airlines/airline1.png')} />
            </View>
            <View style={[styles.logoContainer, styles.qatarLogo]}>
              <Image style={styles.logoImage} source={require('@/assets/images/airlines/airline2.png')} />
            </View>
            <View style={[styles.logoContainer, styles.cathayLogo]}>
              <Image style={styles.logoImage} source={require('@/assets/images/airlines/airline3.png')} />
            </View>
            <View style={[styles.logoContainer, styles.singaporeLogo]}>
              <Image style={styles.logoImage} source={require('@/assets/images/airlines/airline4.jpg')} />
            </View>
          </View>
          <View style={styles.logoRowSecond}>
            <View style={[styles.logoContainer, styles.singaporeAltLogo]}>
              <Image style={styles.logoImage} source={require('@/assets/images/airlines/airline4.jpg')} />
            </View>
            <View style={[styles.logoContainer, styles.emiratesLogo]}>
              <Image style={styles.logoImage} source={require('@/assets/images/airlines/airline5.png')} />
            </View>
            <View style={[styles.logoContainer, styles.whiteLogo]}>
              <Image style={styles.logoImage} source={require('@/assets/images/airlines/airline6.jpg')} />
            </View>
          </View>
        </View>

        {/* Main Heading */}
        <Text style={styles.mainHeading}>
          Organise all your travels in one place
        </Text>

        {/* Features List */}
        <View style={styles.featuresList}>
          <FeatureItem
            icon={require('@/assets/images/icons/ote-icon1.png')}
            title="All-in-one Flight Search"
            description="The most comprehensive flight search, at par with Google Flight Search, scanning hundreds of airlines"
            iconBackgroundColor="#2262CD33"
          />
          
          <FeatureItem
            icon={require('@/assets/images/icons/ote-icon2.png')}
            title="Compare Cash vs Award Tickets"
            description="Gain insights on the best deals with cents/mile value, comparing award flights to cash prices"
            iconBackgroundColor="#F59B0033"
          />
          
          <FeatureItem
            icon={require('@/assets/images/icons/ote-icon3.png')}
            title="Make your travel rewarding"
            description="Earn miles when you book a flight ticket through HeyMax"
            iconBackgroundColor="#DB4C4033"
          />
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Page Indicators */}
        <View style={styles.pageIndicators}>
          <View style={[styles.indicator, styles.activeIndicator]} />
          <View style={styles.indicator} />
        </View>

        {/* Next Button */}
        <PrimaryButton
          title="Next"
          dark={true}
          onPress={() => router.push('/prompt')}
          style={styles.nextButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColorDark,
    paddingHorizontal: 8,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  logoGrid: {
    marginBottom: 40,
    alignItems: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 16,
    width: '100%',
  },
  logoRowSecond: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '75%',
  },
  logoContainer: {
    width: 70,
    height: 70,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: "100%",
    height: undefined,
    borderRadius: 16,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  airAsiaLogo: {
    backgroundColor: '#DF1D25',
  },
  qatarLogo: {
    backgroundColor: '#440C33',
  },
  cathayLogo: {
    backgroundColor: '#FFFFFF',
  },
  singaporeLogo: {
    backgroundColor: '#2196F3',
  },
  singaporeAltLogo: {
    backgroundColor: '#2196F3',
  },
  emiratesLogo: {
    backgroundColor: '#D71A21',
  },
  whiteLogo: {
    backgroundColor: 'white',
  },
  mainHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: foregroundColorDark,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 36,
  },
  featuresList: {
    marginBottom: 60,
  },
  pageIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: primaryColorDark,
    width: 24,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
  nextButton: {
    borderRadius: 25,
  },
});