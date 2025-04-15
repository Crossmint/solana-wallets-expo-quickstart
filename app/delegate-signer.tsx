import { useWallet } from "@crossmint/client-sdk-react-native-ui";
import Button from "../components/Button";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Linking } from "react-native";

export default function DelegateSigners() {
	const { wallet, type } = useWallet();
	const [isLoading, setIsLoading] = useState(false);
	// TODO: delegatedSigners should be typed
	const [delegatedSigners, setDelegatedSigners] = useState<any[]>([]);
	const [newSigner, setNewSigner] = useState<string>("");

	useEffect(() => {
		const fetchDelegatedSigners = async () => {
			if (wallet != null && type === "solana-smart-wallet") {
				const signers = await wallet.getDelegatedSigners();
				setDelegatedSigners(signers);
			}
		};
		fetchDelegatedSigners();
	}, [wallet, type]);

	const addNewSigner = async () => {
		if (wallet == null || type !== "solana-smart-wallet") {
			throw new Error("No wallet connected");
		}
		if (!newSigner) {
			alert("Delegated Signer: no signer provided!");
			return;
		}
		try {
			setIsLoading(true);
			await wallet.addDelegatedSigner(`solana-keypair:${newSigner}`);
			const signers = await wallet.getDelegatedSigners();
			setDelegatedSigners(signers);
		} catch (err) {
			console.error("Delegated Signer: ", err);
			alert(`Delegated Signer: ${err}`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.sectionTitle}>Add Delegated Signer</Text>
			<Text style={styles.sectionSubtitle}>
				Allow third parties to sign transactions on behalf of your wallet.{" "}
				<Text
					style={styles.learnMoreLink}
					onPress={() =>
						Linking.openURL(
							"https://docs.crossmint.com/wallets/advanced/delegated-keys",
						)
					}
				>
					Learn more
				</Text>
				.
			</Text>

			<Text style={styles.formLabel}>Delegated Signer</Text>
			<TextInput
				style={styles.input}
				placeholder="Ex: 5YNmS1R9nNSCDzb5a7mMJ1dwK9UHeA"
				onChangeText={setNewSigner}
			/>

			<Button
				title={isLoading ? "Processing..." : "Add"}
				onPress={addNewSigner}
				disabled={isLoading}
			/>

			{/* List of delegated signers */}
			{delegatedSigners.length > 0 && (
				<View style={styles.signersContainer}>
					<Text style={styles.signersTitle}>Registered signers</Text>
					<View style={styles.signersListContainer}>
						<View style={styles.signersList}>
							{delegatedSigners.map((signer, index) => (
								<Text key={signer.locator} style={styles.signerItem}>
									{signer.locator}
								</Text>
							))}
						</View>
					</View>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
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
	learnMoreLink: {
		color: "#007AFF",
		textDecorationLine: "underline",
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
	},
	signersContainer: {
		backgroundColor: "#f9fafb",
		padding: 12,
		borderRadius: 6,
		marginTop: 20,
	},
	signersTitle: {
		fontSize: 12,
		color: "#666",
		marginBottom: 6,
	},
	signersListContainer: {
		backgroundColor: "#fff",
		padding: 4,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: "#f3f4f6",
	},
	signersList: {
		flexDirection: "column",
		gap: 4,
	},
	signerItem: {
		fontSize: 12,
		color: "#4b5563",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 4,
	},
});
