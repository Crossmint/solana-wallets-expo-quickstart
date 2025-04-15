import React from "react";
import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CrossmintProviders from "./providers";

// Import utilities
import "@/lib/polyfills";

const queryClient = new QueryClient();

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<CrossmintProviders>
				<View style={styles.container}>
					<Stack
						screenOptions={{
							headerShown: false,
							contentStyle: {
								flex: 1,
							},
						}}
					>
						<Stack.Screen
							name="login"
							options={{
								contentStyle: {
									backgroundColor: "#FFFFFF",
								},
							}}
						/>
						<Stack.Screen
							name="wallet"
							options={{
								contentStyle: {
									backgroundColor: "#F8FAFC",
								},
							}}
						/>
					</Stack>
				</View>
			</CrossmintProviders>
		</QueryClientProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
