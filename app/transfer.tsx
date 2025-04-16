import { useWallet } from "@crossmint/client-sdk-react-native-ui";
import {
	createTokenTransferTransaction,
	createNativeTransferTransaction,
} from "../lib/createTransaction";
import React, { useState, useCallback } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Alert,
	ActivityIndicator,
	Linking,
} from "react-native";

export default function Transfer() {
	const { wallet, type } = useWallet();
	const [amount, setAmount] = useState("");
	const [recipientAddress, setRecipientAddress] = useState("");
	const [selectedToken, setSelectedToken] = useState<"SOL" | "USDC">("SOL");
	const [txHash, setTxHash] = useState<string | null>(null);
	const [isPending, setIsPending] = useState(false);

	const transferTokens = useCallback(async () => {
		if (wallet == null || type !== "solana-smart-wallet") {
			return;
		}

		try {
			setIsPending(true);
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

			const hash = await wallet.sendTransaction({
				transaction,
			});
			if (hash) {
				setTxHash(hash);
				setAmount("");
				setRecipientAddress("");
			}
		} catch (error) {
			console.error("Transfer error:", error);
			Alert.alert("Transfer Failed", `${error}`);
		} finally {
			setIsPending(false);
		}
	}, [wallet, type, selectedToken, recipientAddress, amount]);

	return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Transfer funds</Text>
      <Text style={styles.sectionSubtitle}>Send funds to another wallet</Text>
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

        <TouchableOpacity
          style={[
            styles.button,
            (!amount || !recipientAddress || isPending) &&
              styles.buttonDisabled,
          ]}
          onPress={transferTokens}
          disabled={!amount || !recipientAddress || isPending}
        >
          {isPending ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>Transfer</Text>
          )}
        </TouchableOpacity>
        {txHash && !isPending && (
          <TouchableOpacity
            onPress={() => Linking.openURL(`https://solscan.io/tx/${txHash}?`)}
            style={{ marginTop: 10 }}
          >
            <Text style={styles.solscanLink}>
              → View on Solscan
            </Text>
          </TouchableOpacity>
        )}
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
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 14,
		backgroundColor: "#05b959",
		borderRadius: 8,
		width: "100%",
	},
	buttonSecondary: {
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#E8E8E9",
	},
	buttonDisabled: {
		opacity: 0.6,
	},
	buttonText: {
		fontSize: 14,
		fontWeight: "500",
		color: "#fff",
	},
	buttonTextSecondary: {
		color: "#000",
	},
	solscanLink: {
		fontSize: 12,
		color: "#666",
		textAlign: "center",
	},
});
