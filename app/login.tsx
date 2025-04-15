import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Button from "../components/Button";
import { useCrossmintAuth } from "@crossmint/client-sdk-react-native-ui";
import CrossmintLogo from "../components/icons/CrossmintLogo";
import GoogleIcon from "../components/icons/GoogleIcon";
import CrossmintLeaf from "@/components/icons/CrossmintLeaf";
import { router } from "expo-router";

export default function Login() {
	const { loginWithOAuth, createAuthSession, user, crossmintAuth } =
		useCrossmintAuth();
	const [email, setEmail] = useState("");
	const [emailId, setEmailId] = useState("");
	const [otpSent, setOtpSent] = useState(false);
	const [otp, setOtp] = useState("");

	useEffect(() => {
		if (user != null) {
			router.push("/wallet");
		}
	}, [user]);

	const handleSendOtp = async () => {
		const res = await crossmintAuth?.sendEmailOtp(email);
		setEmailId(res.emailId);
		setOtpSent(true);
	};

	const handleVerifyOtp = async () => {
		const oneTimeSecret = await crossmintAuth?.confirmEmailOtp(
			email,
			emailId,
			otp,
		);
		await createAuthSession(oneTimeSecret);
	};

	return (
		<View style={styles.content}>
			<View style={styles.logoContainer}>
				<CrossmintLogo />
			</View>
			<Text style={styles.title}>Solana Wallets Quickstart</Text>
			<Text style={styles.subtitle}>The easiest way to build onchain</Text>

			<TextInput
				style={styles.input}
				placeholder="beatriz@paella.dev"
				placeholderTextColor="#666"
				keyboardType="email-address"
				autoCapitalize="none"
				autoCorrect={false}
				value={email}
				onChangeText={setEmail}
				editable={!otpSent}
			/>

			{!otpSent ? (
				<Button title="Sign in" onPress={handleSendOtp} variant="primary" />
			) : (
				<>
					<TextInput
						style={styles.input}
						placeholder="Enter OTP code"
						placeholderTextColor="#666"
						keyboardType="number-pad"
						autoCapitalize="none"
						autoCorrect={false}
						value={otp}
						onChangeText={setOtp}
					/>
					<View style={styles.otpButtonsContainer}>
						<Button
							title="Verify OTP"
							onPress={handleVerifyOtp}
							variant="primary"
						/>
						<Button
							title="Back"
							onPress={() => setOtpSent(false)}
							variant="secondary"
						/>
					</View>
				</>
			)}

			<View style={styles.orContainer}>
				<View style={styles.orLine} />
				<Text style={styles.orText}>OR</Text>
				<View style={styles.orLine} />
			</View>

			<Button
				title="Sign in with Google"
				onPress={() => loginWithOAuth("google")}
				variant="secondary"
				icon={<GoogleIcon />}
			/>

			<View style={styles.poweredByContainer}>
				<CrossmintLeaf style={styles.poweredByIcon} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	content: {
		backgroundColor: "#fff",
		flex: 1,
		padding: 20,
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "center",
		width: "100%",
	},
	logoContainer: {
		marginBottom: 12,
	},
	title: {
		fontSize: 28,
		textAlign: "center",
		marginBottom: 8,
		color: "#000",
	},
	subtitle: {
		fontSize: 16,
		color: "#666",
		textAlign: "center",
		marginBottom: 40,
	},
	input: {
		width: "100%",
		height: 48,
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#E0E0E0",
		borderRadius: 8,
		paddingHorizontal: 16,
		marginBottom: 12,
		fontSize: 16,
		color: "#000",
	},
	orContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 24,
		gap: 16,
	},
	orLine: {
		flex: 1,
		height: 1,
		backgroundColor: "#E0E0E0",
	},
	orText: {
		fontSize: 14,
		color: "#666",
	},
	poweredByContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 24,
	},
	poweredByIcon: {
		width: 16,
		height: 16,
	},
	otpButtonsContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 8,
	},
});
