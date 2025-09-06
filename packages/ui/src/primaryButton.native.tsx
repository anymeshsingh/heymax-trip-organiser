import { TouchableOpacity, Text, GestureResponderEvent, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { primaryColorDark, foregroundColorDark, primaryColorLight, foregroundColorLight } from './appColors';

interface PrimaryButtonProps {
  title: string;
  style?: StyleProp<ViewStyle>,
  onPress: (event: GestureResponderEvent) => void
  dark: boolean
}

export const PrimaryButton = ({ title, style, onPress, dark = false }: PrimaryButtonProps) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button,
        { backgroundColor: dark ? primaryColorDark : primaryColorLight },
        style,
      ]} 
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: primaryColorDark,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginRight: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: foregroundColorDark,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});