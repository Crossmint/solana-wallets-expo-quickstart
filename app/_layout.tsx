import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import utilities
import "@/src/utils";
import WalletProvider from "@/app/components/providers/WalletProvider";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ title: "Crossmint Expo Demo" }}
          />
        </Stack>
      </WalletProvider>
    </QueryClientProvider>
  );
}
