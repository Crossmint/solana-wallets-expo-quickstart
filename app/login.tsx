import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Image,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import {
	useCrossmintAuth,
	useWallet,
} from "@crossmint/client-sdk-react-native-ui";
import { router } from "expo-router";

export default function Login() {
	const { loginWithOAuth, createAuthSession, user, crossmintAuth } =
		useCrossmintAuth();
	const {
		experimental_createRecoveryKeySigner,
		experimental_validateEmailOtp,
		experimental_recoverySigner,
		experimental_recoveryKeyStatus,
	} = useWallet();
	const [email, setEmail] = useState("");
	const [emailId, setEmailId] = useState("");
	const [otpSent, setOtpSent] = useState(false);
	const [otp, setOtp] = useState("");
	const [isPending, setIsPending] = useState(false);
	const [secondOtp, setSecondOtp] = useState("");
	const [isValidatingSecondOtp, setIsValidatingSecondOtp] = useState(false);
	const [secondOtpError, setSecondOtpError] = useState<string | null>(null);

	useEffect(() => {
		if (user != null && experimental_recoverySigner != null) {
			router.push("/");
		}
	}, [user, experimental_recoverySigner]);

	useEffect(() => {
		if (experimental_recoverySigner == null && user != null) {
			experimental_createRecoveryKeySigner(`email:${user.email}`);
		}
	}, [experimental_recoverySigner, experimental_createRecoveryKeySigner, user]);

	const sendOtp = async () => {
		setIsPending(true);
		const res = await crossmintAuth?.sendEmailOtp(email);
		setEmailId(res.emailId);
		setOtpSent(true);
		setIsPending(false);
	};

	const verifyOtp = async () => {
		setIsPending(true);
		const oneTimeSecret = await crossmintAuth?.confirmEmailOtp(
			email,
			emailId,
			otp,
		);

		await createAuthSession(oneTimeSecret);
		setIsPending(false);

		try {
			await experimental_createRecoveryKeySigner(email);
		} catch (error) {
			console.error("createRecoveryKeySigner error:", error);
		}
	};

	const verifySecondOtp = async () => {
		setSecondOtpError(null);
		setIsValidatingSecondOtp(true);
		try {
			const address = await experimental_validateEmailOtp(secondOtp);
			if (address == null) {
				setSecondOtpError("Invalid or expired OTP. Please try again.");
			}
		} catch (error) {
			console.error("verifySecondOtp error:", error);
			setSecondOtpError("Failed to validate OTP. Please try again.");
		} finally {
			setIsValidatingSecondOtp(false);
		}
	};

	return (
		<View style={styles.content}>
			<View style={styles.logoContainer}>
				<Image
					source={require("../assets/images/crossmint-logo.png")}
					style={styles.logo}
				/>
			</View>
			<Text style={styles.title}>Solana Wallets Quickstart</Text>
			<Text style={styles.subtitle}>The easiest way to build onchain</Text>

			{experimental_recoveryKeyStatus !== "awaiting-otp-validation" && (
				<>
					<TextInput
						style={styles.input}
						placeholder="beatriz@paella.dev"
						placeholderTextColor="#666"
						keyboardType="email-address"
						autoCapitalize="none"
						autoCorrect={false}
						value={email}
						onChangeText={setEmail}
						editable={!otpSent && !isPending}
					/>

					{!otpSent ? (
						<TouchableOpacity
							style={[styles.button, isPending && styles.buttonDisabled]}
							onPress={sendOtp}
							disabled={isPending || email.length === 0}
						>
							{isPending ? (
								<ActivityIndicator color="#fff" size="small" />
							) : (
								<Text style={styles.buttonText}>Sign in with Email</Text>
							)}
						</TouchableOpacity>
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
								editable={!isPending}
							/>
							<View style={styles.otpButtonsContainer}>
								<TouchableOpacity
									style={[styles.button, isPending && styles.buttonDisabled]}
									onPress={verifyOtp}
									disabled={isPending || otp.length === 0}
								>
									{isPending ? (
										<ActivityIndicator color="#fff" size="small" />
									) : (
										<Text style={styles.buttonText}>
											Verify OTP & Create Wallet
										</Text>
									)}
								</TouchableOpacity>
								<TouchableOpacity
									style={[
										styles.button,
										styles.buttonSecondary,
										isPending && styles.buttonDisabled,
									]}
									onPress={() => {
										setOtpSent(false);
										setOtp("");
										setEmailId("");
									}}
									disabled={isPending}
								>
									<Text style={[styles.buttonText, styles.buttonTextSecondary]}>
										Back
									</Text>
								</TouchableOpacity>
							</View>
						</>
					)}

					<View style={styles.orContainer}>
						<View style={styles.orLine} />
						<Text style={styles.orText}>OR</Text>
						<View style={styles.orLine} />
					</View>

					<TouchableOpacity
						style={[
							styles.button,
							styles.buttonSecondary,
							isPending && styles.buttonDisabled,
						]}
						onPress={() => loginWithOAuth("google")}
						disabled={isPending}
					>
						<View style={styles.buttonIconContainer}>
							<Image
								source={require("../assets/images/google.png")}
								style={styles.googleIcon}
							/>
						</View>
						<Text style={[styles.buttonText, styles.buttonTextSecondary]}>
							Sign in with Google
						</Text>
					</TouchableOpacity>
				</>
			)}

			{experimental_recoveryKeyStatus === "awaiting-otp-validation" && (
				<>
					<Text style={styles.infoText}>
						For security, please enter the second verification code sent to your
						email.
					</Text>
					<TextInput
						style={styles.input}
						placeholder="Enter second OTP code"
						placeholderTextColor="#666"
						keyboardType="number-pad"
						autoCapitalize="none"
						autoCorrect={false}
						value={secondOtp}
						onChangeText={setSecondOtp}
						editable={!isValidatingSecondOtp}
					/>
					{secondOtpError && (
						<Text style={styles.errorText}>{secondOtpError}</Text>
					)}
					<TouchableOpacity
						style={[
							styles.button,
							isValidatingSecondOtp && styles.buttonDisabled,
						]}
						onPress={verifySecondOtp}
						disabled={isValidatingSecondOtp || secondOtp.length === 0}
					>
						{isValidatingSecondOtp ? (
							<ActivityIndicator color="#fff" size="small" />
						) : (
							<Text style={styles.buttonText}>Verify Second OTP</Text>
						)}
					</TouchableOpacity>
				</>
			)}

			<View style={styles.poweredByContainer}>
				<Image
					source={require("../assets/images/secured-by-crossmint.png")}
					style={styles.poweredByIcon}
				/>
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
	logo: {
		width: 180,
		height: 40,
		resizeMode: "contain",
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
	googleIcon: {
		width: 20,
		height: 20,
		resizeMode: "contain",
	},
	poweredByIcon: {
		width: 400,
		height: 20,
		resizeMode: "contain",
	},
	otpButtonsContainer: {
		width: "100%",
		flexDirection: "column",
		justifyContent: "space-between",
		gap: 8,
	},
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 14,
		backgroundColor: "#05b959",
		borderRadius: 8,
		width: "100%",
		marginBottom: 8,
	},
	buttonSecondary: {
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#E8E8E9",
	},
	buttonDisabled: {
		backgroundColor: "#a0a0a0",
		borderColor: "#d0d0d0",
	},
	buttonText: {
		fontSize: 14,
		fontWeight: "500",
		color: "#fff",
	},
	buttonTextSecondary: {
		color: "#000",
	},
	buttonIconContainer: {
		marginRight: 8,
	},
	infoText: {
		fontSize: 14,
		color: "#333",
		textAlign: "center",
		marginBottom: 12,
	},
	errorText: {
		fontSize: 14,
		color: "red",
		textAlign: "center",
		marginBottom: 12,
	},
});
