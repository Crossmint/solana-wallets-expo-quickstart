import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import TokenItem from "../components/TokenItem";
import Button from "../components/Button";
import { router } from "expo-router";
import type { Token, TokenDefinition, TokenSymbol } from "../types/wallet";
import { useWallet } from "@crossmint/client-sdk-react-native-ui";
import SolanaIcon from "../components/icons/SolanaIcon";
import USDCIcon from "../components/icons/USDCIcon";
import { Linking } from "react-native";

const formatBalance = (balance: string, decimals: number) => {
	return (Number(balance) / 10 ** decimals).toFixed(2);
};

const tokenDefinitions: Record<TokenSymbol, TokenDefinition> = {
	SOL: {
		symbol: "SOL",
		name: "Solana",
	},
	USDC: {
		symbol: "USDC",
		name: "USDC",
	},
};

const initialTokens: Token[] = [
	{ ...tokenDefinitions.SOL, balance: "0" },
	{ ...tokenDefinitions.USDC, balance: "0" },
];

export default function Balance() {
	const { wallet, getOrCreateWallet } = useWallet();
	const [tokenList, setTokenList] = useState<Token[]>(initialTokens);

	useEffect(() => {
		if (wallet == null) {
			getOrCreateWallet({
				type: "solana-smart-wallet",
				args: {},
			});
		}
	}, [wallet, getOrCreateWallet]);

	useEffect(() => {
		const fetchBalances = async () => {
			if (wallet == null) {
				return;
			}
			try {
				const balances = await wallet.getBalances(["sol", "usdc"] as never[]);
				if (!Array.isArray(balances)) {
					return;
				}

				const solBalance = formatBalance(
					balances.find((t) => t.token === "sol")?.balances.total || "0",
					9,
				);
				const usdcBalance = formatBalance(
					balances.find((t) => t.token === "usdc")?.balances.total || "0",
					6,
				);

				setTokenList([
					{ ...tokenDefinitions.SOL, balance: solBalance },
					{ ...tokenDefinitions.USDC, balance: usdcBalance },
				]);
			} catch (error) {
				console.error("Error fetching wallet balances:", error);
			}
		};
		fetchBalances();
	}, [wallet]);

	const getTestSol = async () => {
		try {
			await Linking.openURL("https://faucet.solana.com");
		} catch (error) {
			console.error("Error opening Solana faucet:", error);
		}
	};

	const getTestUsdc = async () => {
		try {
			await Linking.openURL("https://faucet.circle.com");
		} catch (error) {
			console.error("Error opening Circle faucet:", error);
		}
	};

	if (wallet == null) {
		return (
			<View style={styles.container}>
				<Text>Loading wallet information...</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.balanceHeader}>
				<Text style={styles.sectionTitle}>Wallet balance</Text>
				<Text style={styles.sectionSubtitle}>Check the wallet balance</Text>
			</View>

			<View>
				{tokenList.map((token, index) => (
					<React.Fragment key={token.symbol}>
						<TokenItem token={token} />
						{index < tokenList.length - 1 && <View style={styles.divider} />}
					</React.Fragment>
				))}
			</View>

			<View style={styles.buttonContainer}>
				<Button
					title="Get test SOL"
					variant="secondary"
					onPress={getTestSol}
					icon={<SolanaIcon />}
				/>
				<Button
					title="Get test USDC"
					variant="secondary"
					onPress={getTestUsdc}
					icon={<USDCIcon />}
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
	balanceHeader: {
		marginBottom: 16,
	},
	sectionTitle: {
		fontSize: 18,
		marginBottom: 4,
	},
	sectionSubtitle: {
		fontSize: 14,
		color: "#666",
	},
	divider: {
		height: 1,
		backgroundColor: "#EEEEEF",
		marginVertical: 8,
	},
	buttonContainer: {
		gap: 12,
		marginTop: 16,
	},
});
