import React from "react";
import { View, StyleSheet } from "react-native";
import { useCrossmintAuth } from "@crossmint/client-sdk-react-native-ui";
import Button from "../components/Button";

export default function Logout() {
	const { logout } = useCrossmintAuth();

	return (
		<View style={styles.container}>
			<Button title="Log Out" onPress={logout} variant="secondary" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
});
