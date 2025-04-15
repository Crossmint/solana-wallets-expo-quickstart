import Button from "../components/Button";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function DelegateSigners() {
	const [delegatedSignerAddress, setDelegatedSignerAddress] = useState("");

	const handleAddDelegatedSigner = () => {
		// TODO: Implement delegated signer
		console.log("Delegated signer address:", delegatedSignerAddress);
		// Reset form after submission
		setDelegatedSignerAddress("");
	};

	return (
		<View style={styles.container}>
			<Text style={styles.sectionTitle}>Delegated signer</Text>
			<Text style={styles.sectionSubtitle}>
				Allow other signers to sign transactions on behalf of the wallet.
			</Text>

			<Text style={styles.formLabel}>Add delegated signer</Text>
			<TextInput
				style={styles.input}
				placeholder="Ex: 5YNmS1R9nNSCDzb5a7mMJ1dwK9UHeA"
				value={delegatedSignerAddress}
				onChangeText={setDelegatedSignerAddress}
			/>

			<Button
				title="Add"
				onPress={handleAddDelegatedSigner}
				disabled={!delegatedSignerAddress}
			/>
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
});
