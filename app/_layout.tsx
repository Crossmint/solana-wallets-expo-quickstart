import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";

// Import utilities
import "@/app/utils";
import CrossmintProviders from "@/app/providers/CrossmintProviders";

const queryClient = new QueryClient();

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<CrossmintProviders>
				<StatusBar style="dark" />
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="index" />
					<Stack.Screen name="wallet" />
				</Stack>
			</CrossmintProviders>
		</QueryClientProvider>
	);
}
