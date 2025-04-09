import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";

// Import utilities
import "@/app/utils";
import WalletProvider from "@/app/components/providers/WalletProvider";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="wallet" />
          <Stack.Screen name="browser" />
        </Stack>
      </WalletProvider>
    </QueryClientProvider>
  );
}
