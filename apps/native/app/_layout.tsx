import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="inverted" />
      <Stack screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen key="/index" name="index" />
        <Stack.Screen key="/prompt" name="prompt" />
      </Stack>
    </>
  );
}