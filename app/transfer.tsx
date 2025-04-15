import Button from "../components/Button";
import { useWallet } from "@crossmint/client-sdk-react-native-ui";
import type { TokenSymbol } from "../types/wallet";
import {
	createTokenTransferTransaction,
	createNativeTransferTransaction,
} from "../lib/createTransaction";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Alert,
} from "react-native";

export default function Transfer() {
	const { wallet, type } = useWallet();
	const [amount, setAmount] = useState("");
	const [recipientAddress, setRecipientAddress] = useState("");
	const [selectedToken, setSelectedToken] = useState<TokenSymbol>("SOL");
	const [successSignature, setSuccessSignature] = useState<string | null>(null);

	const { mutate: handleTransfer, isPending } = useMutation({
		mutationFn: async () => {
			if (wallet == null || type !== "solana-smart-wallet") {
				return;
			}
			const transaction =
				selectedToken === "SOL"
					? await createNativeTransferTransaction(
							wallet.address,
							recipientAddress,
							Number(amount),
						)
					: await createTokenTransferTransaction(
							wallet.address,
							recipientAddress,
							process.env.EXPO_PUBLIC_USDC_TOKEN_MINT ||
								"4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
							Number(amount),
						);

			console.log("Transaction created");
			console.log({ transaction });

			console.log("Sending transaction");
			const hash = await wallet.sendTransaction({
				transaction,
			});

			console.log("Transaction sent");
			console.log({ hash });

			return hash;
		},
		mutationKey: ["transfer", wallet?.address, recipientAddress, amount],
		onSuccess: (signature) => {
			console.log("Transfer success");
			console.log({ signature });
			if (signature) {
				setSuccessSignature(signature);
				setAmount("");
				setRecipientAddress("");
			}
		},
		onError: (error) => {
			console.error("Transfer error:", error);
			Alert.alert(
				"Transfer Failed",
				"There was an error processing your transfer. Please try again.",
			);
		},
	});

	return (
		<View style={styles.container}>
			<Text style={styles.sectionTitle}>Transfer funds</Text>
			<Text style={styles.sectionSubtitle}>Send funds to another wallet</Text>

			{successSignature && (
				<View style={styles.successMessage}>
					<Text style={styles.successText}>Transfer successful!</Text>
					<Text style={styles.signatureText}>
						Signature: {successSignature.slice(0, 8)}...
						{successSignature.slice(-8)}
					</Text>
					<TouchableOpacity onPress={() => setSuccessSignature(null)}>
						<Text style={styles.dismissText}>Dismiss</Text>
					</TouchableOpacity>
				</View>
			)}

			<View style={styles.formSection}>
				<Text style={styles.formLabel}>Token</Text>
				<View style={styles.tokenSelector}>
					<TouchableOpacity
						style={styles.tokenOption}
						onPress={() => setSelectedToken("USDC")}
					>
						<View style={styles.radioButton}>
							{selectedToken === "USDC" && (
								<View style={styles.radioButtonInner} />
							)}
						</View>
						<Text>USDC</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.tokenOption}
						onPress={() => setSelectedToken("SOL")}
					>
						<View style={styles.radioButton}>
							{selectedToken === "SOL" && (
								<View style={styles.radioButtonInner} />
							)}
						</View>
						<Text>SOL</Text>
					</TouchableOpacity>
				</View>

				<Text style={styles.formLabel}>Amount</Text>
				<TextInput
					style={styles.input}
					placeholder="0.00"
					value={amount}
					onChangeText={setAmount}
					keyboardType="decimal-pad"
				/>

				<Text style={styles.formLabel}>Recipient wallet</Text>
				<TextInput
					style={styles.input}
					placeholder="Enter wallet address"
					value={recipientAddress}
					onChangeText={setRecipientAddress}
				/>

				<Button
					title="Transfer"
					onPress={() => handleTransfer()}
					disabled={!amount || !recipientAddress || isPending}
					loading={isPending}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
	},
	sectionTitle: {
		fontSize: 18,
		marginBottom: 4,
	},
	sectionSubtitle: {
		fontSize: 14,
		color: "#666",
		marginBottom: 24,
	},
	formSection: {
		width: "100%",
	},
	formLabel: {
		fontSize: 14,
		marginBottom: 8,
		marginTop: 16,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		padding: 12,
		fontSize: 14,
		marginBottom: 16,
		backgroundColor: "#fff",
	},
	tokenSelector: {
		flexDirection: "row",
		marginBottom: 16,
	},
	tokenOption: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 24,
	},
	radioButton: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: "#666",
		marginRight: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	radioButtonInner: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: "#05b959",
	},
	successMessage: {
		backgroundColor: "#e6ffe6",
		padding: 16,
		borderRadius: 12,
		marginBottom: 24,
	},
	successText: {
		color: "#008000",
		fontSize: 16,
		marginBottom: 8,
	},
	signatureText: {
		color: "#666",
		fontSize: 14,
		marginBottom: 8,
	},
	dismissText: {
		color: "#008000",
		fontSize: 14,
		textDecorationLine: "underline",
	},
});
