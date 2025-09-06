import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack key="index" screenOptions={{
    headerShown: false,
  }} />;
}