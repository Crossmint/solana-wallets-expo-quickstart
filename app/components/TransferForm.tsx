import Button from "@/app/components/ui/Button";
import {
	type SolanaSmartWallet,
	useWallet,
} from "@crossmint/client-sdk-react-native-ui";
import type { TokenSymbol } from "@/app/types/wallet";
import {
	createTokenTransferTransaction,
	createNativeTransferTransaction,
} from "@/app/utils";
import { usdcDevnetTokenMint } from "@/app/utils/config";
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

export default function TransferForm() {
	const { wallet } = useWallet();
	const [amount, setAmount] = useState("");
	const [recipientAddress, setRecipientAddress] = useState("");
	const [selectedToken, setSelectedToken] = useState<TokenSymbol>("SOL");
	const [successSignature, setSuccessSignature] = useState<string | null>(null);

	const { mutate: handleTransfer, isPending } = useMutation({
		mutationFn: async () => {
			if (!wallet) {
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
							usdcDevnetTokenMint,
							Number(amount),
						);

			console.log("Transaction created");
			console.log({ transaction });

			console.log("Sending transaction");
			const hash = ((await wallet) as SolanaSmartWallet).sendTransaction({
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
						<Text
							style={
								selectedToken === "USDC" ? styles.selectedTokenText : undefined
							}
						>
							USDC
						</Text>
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
						<Text
							style={
								selectedToken === "SOL" ? styles.selectedTokenText : undefined
							}
						>
							SOL
						</Text>
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
					onPress={handleTransfer}
					disabled={!amount || !recipientAddress || isPending}
					loading={isPending}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 8,
	},
	sectionSubtitle: {
		fontSize: 16,
		color: "#666",
		marginBottom: 24,
	},
	formSection: {
		width: "100%",
	},
	formLabel: {
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 8,
		marginTop: 16,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		padding: 12,
		fontSize: 16,
		marginBottom: 16,
	},
	tokenSelector: {
		flexDirection: "row",
		marginBottom: 16,
	},
	tokenOption: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 24,
		paddingVertical: 8,
	},
	selectedTokenText: {
		fontWeight: "600",
	},
	radioButton: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: "#00C853",
		marginRight: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	radioButtonInner: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: "#00C853",
	},
	successMessage: {
		backgroundColor: "#E8F5E9",
		borderRadius: 8,
		padding: 16,
		marginBottom: 16,
	},
	successText: {
		color: "#00C853",
		fontWeight: "600",
		fontSize: 16,
		marginBottom: 8,
	},
	signatureText: {
		fontSize: 14,
		color: "#333",
		marginBottom: 8,
	},
	dismissText: {
		color: "#00C853",
		fontWeight: "500",
	},
});
