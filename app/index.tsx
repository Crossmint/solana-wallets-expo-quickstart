import { Redirect } from "expo-router";
import { useCrossmintAuth } from "@crossmint/client-sdk-react-native-ui";
import { useEffect } from "react";
import * as Linking from "expo-linking";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
	const { createAuthSession, status } = useCrossmintAuth();
	const url = Linking.useURL();

	useEffect(() => {
		if (url != null) {
			createAuthSession(url);
		}
	}, [url, createAuthSession]);

	if (status === "initializing" || status === "in-progress") {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	// If we have a user, redirect to wallet, otherwise to login
	return <Redirect href={status === "logged-in" ? "/wallet" : "/login"} />;
}
