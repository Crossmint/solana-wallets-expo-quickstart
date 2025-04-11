import { Image, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import AppLayout from "@/app/components/layout/AppLayout";
import Button from "@/app/components/ui/Button";
import { useCrossmintAuth } from "@crossmint/client-sdk-react-native-ui";
import { useEffect } from "react";

export default function LoginScreen() {
	const { loginWithOAuth, user, oauthUrlMap } = useCrossmintAuth();

	useEffect(() => {
		if (user != null) {
			router.push("/wallet");
		}
	}, [user]);

	return (
		<AppLayout>
			<View style={styles.container}>
				<View style={styles.content}>
					<Image
						source={require("@/assets/images/crossmint-original.png")}
						style={styles.logo}
					/>
					<Text style={styles.title}>Solana Wallets Quickstart</Text>
					<Text style={styles.subtitle}>The easiest way to build onchain</Text>

					<View style={styles.buttonContainer}>
						{oauthUrlMap.google == null && <Text>Loading...</Text>}
						{oauthUrlMap.google && (
							<Button title="Login" onPress={() => loginWithOAuth("google")} />
						)}
					</View>
				</View>
			</View>
		</AppLayout>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	content: {
		padding: 20,
		marginTop: "20%",
		alignItems: "center",
	},
	logo: {
		width: 150,
		height: 40,
		resizeMode: "contain",
		marginBottom: 24,
	},
	title: {
		fontSize: 28,
		fontWeight: "700",
		textAlign: "center",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: "#666",
		textAlign: "center",
		marginBottom: 40,
	},
	buttonContainer: {
		width: "100%",
		marginTop: 24,
	},
});
