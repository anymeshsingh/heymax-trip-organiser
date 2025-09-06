import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});


export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <Stack screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen key="/index" name="index" />
        <Stack.Screen key="/prompt" name="prompt" />
        <Stack.Screen key="/myTrips" name="myTrips" />
        <Stack.Screen key="/createTrip" name="createTrip" />
      </Stack>
    </QueryClientProvider>
  );
}