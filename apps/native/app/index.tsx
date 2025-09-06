import { Text, View, Image, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { PrimaryButton } from "@repo/ui/primaryButton.native"
import { primaryColorDark, backgroundColorDark, foregroundColorDark, primaryColorLight } from "@repo/ui/appColors"
import { router } from "expo-router";

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
          {/* Feature 1 */}
          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, styles.oteIcon1]}>
              <Image style={styles.featureIconImage} source={require('@/assets/images/icons/ote-icon1.png')} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>All-in-one Flight Search</Text>
              <Text style={styles.featureDescription}>
                The most comprehensive flight search, at par with Google Flight Search, scanning hundreds of airlines
              </Text>
            </View>
          </View>

          {/* Feature 2 */}
          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, styles.oteIcon2]}>
              <Image style={styles.featureIconImage} source={require('@/assets/images/icons/ote-icon2.png')} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Compare Cash vs Award Tickets</Text>
              <Text style={styles.featureDescription}>
                Gain insights on the best deals with cents/mile value, comparing award flights to cash prices
              </Text>
            </View>
          </View>

          {/* Feature 3 */}
          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, styles.oteIcon3]}>
              <Image style={styles.featureIconImage} source={require('@/assets/images/icons/ote-icon3.png')} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Make your travel rewarding</Text>
              <Text style={styles.featureDescription}>
                Earn miles when you book a flight ticket through HeyMax
              </Text>
            </View>
          </View>
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
  featureItem: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#4C63D2',
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
  oteIcon1: {
    backgroundColor: "#2262CD33",
  },
  oteIcon2: {
    backgroundColor: '#F59B0033',
  },
  oteIcon3: {
    backgroundColor: '#DB4C4033',
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