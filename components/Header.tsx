import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
	useCrossmintAuth,
	useWallet,
} from "@crossmint/client-sdk-react-native-ui";
import { Ionicons } from "@expo/vector-icons";
import CrossmintIcon from "./icons/CrossmintIcon";
import * as Clipboard from "expo-clipboard";

export default function Header() {
	const { logout } = useCrossmintAuth();
	const { wallet } = useWallet();

	const handleCopyAddress = async () => {
		if (wallet?.address) {
			await Clipboard.setStringAsync(wallet.address);
		}
	};

	const formatWalletAddress = (address: string) => {
		return `${address.slice(0, 4)}...${address.slice(-4)}`;
	};

	return (
		<View style={styles.container}>
			<View style={styles.topRow}>
				<View style={styles.iconContainer}>
					<CrossmintIcon width={36} height={36} />
				</View>
				<TouchableOpacity style={styles.logoutButton} onPress={logout}>
					<Text style={styles.logoutText}>Logout</Text>
					<Ionicons name="log-out-outline" size={16} color="#666" />
				</TouchableOpacity>
			</View>

			{wallet && (
				<View style={styles.walletInfo}>
					<Text style={styles.walletTitle}>Your wallet</Text>
					<View style={styles.walletAddressContainer}>
						<Text style={styles.walletAddress}>
							{formatWalletAddress(wallet.address)}
						</Text>
						<TouchableOpacity onPress={handleCopyAddress}>
							<Ionicons
								name="copy-outline"
								size={16}
								color="#666"
								style={styles.copyIcon}
							/>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingVertical: 16,
		paddingBottom: 8,
	},
	topRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
	},
	iconContainer: {
		width: 36,
		height: 36,
	},
	logoutButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	logoutText: {
		fontSize: 14,
		color: "#666",
	},
	walletInfo: {
		alignItems: "center",
		marginBottom: 8,
	},
	walletTitle: {
		fontSize: 14,
		color: "#666",
		marginBottom: 4,
	},
	walletAddressContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	walletAddress: {
		fontSize: 20,
		fontWeight: "600",
		color: "#000",
	},
	copyIcon: {
		marginLeft: 8,
	},
});
