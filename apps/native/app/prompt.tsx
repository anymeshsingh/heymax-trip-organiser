import { Text, View, Image, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { PrimaryButton } from "@repo/ui/primaryButton.native"
import { backgroundColorDark, foregroundColorDark } from "@repo/ui/appColors"
import { router } from "expo-router";

export default function Prompt() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Main Illustration Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={require('@/assets/images/prompt-illustration.png')} 
            style={styles.mainImage}
            resizeMode="contain"
          />
        </View>

        {/* Main Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.mainHeading}>
            Track Your{'\n'}Upcoming Trips
          </Text>
          
          <Text style={styles.description}>
            We've tracked your recent flight booking made via HeyMax. Check your upcoming trip anytime, and enjoy exclusive upsizes on hotels, activities, and more.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Let's go Button */}
        <PrimaryButton
          title="Let's go!"
          dark={true}
          onPress={() => {
            router.push("/myTrips");
          }}
          style={styles.letsGoButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColorDark,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 60,
  },
  imageContainer: {
    height: 280,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  mainHeading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: foregroundColorDark,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 38,
  },
  description: {
    fontSize: 16,
    color: foregroundColorDark,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  bottomSection: {
    paddingHorizontal: 24,
  },
  letsGoButton: {
    borderRadius: 25,
    paddingHorizontal: 32,
    width: '100%',
  },
});