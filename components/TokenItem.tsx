import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { Token } from "../types/wallet";
import SolanaIcon from "./icons/SolanaIcon";
import USDCIcon from "./icons/USDCIcon";

type Props = {
	token: Token;
};

export default function TokenItem({ token }: Props) {
	return (
		<View style={styles.container}>
			<View style={styles.leftSection}>
				<View style={styles.tokenIcon}>
					{token.symbol === "SOL" ? <SolanaIcon /> : <USDCIcon />}
				</View>
				<View>
					<Text style={styles.tokenSymbol}>{token.symbol}</Text>
				</View>
			</View>
			<Text style={styles.balance}>
				{token.symbol === "SOL" ? `${token.balance} SOL` : `$${token.balance}`}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 16,
	},
	leftSection: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	tokenIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	tokenSymbol: {
		fontSize: 16,
		color: "#000",
	},
	balance: {
		fontSize: 16,
		color: "#000",
	},
});
