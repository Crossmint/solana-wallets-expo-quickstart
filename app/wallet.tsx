import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useWallet } from "@crossmint/client-sdk-react-native-ui";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

export default function Wallet() {
  const { wallet } = useWallet();

  const copyAddress = async () => {
    if (wallet?.address) {
      await Clipboard.setStringAsync(wallet.address);
      Alert.alert("Address copied to clipboard");
    }
  };

  const formatWalletAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (!wallet) return null;

  return (
    <View style={styles.walletInfo}>
      <Text style={styles.walletTitle}>Your wallet</Text>
      <View style={styles.walletAddressContainer}>
        <Text style={styles.walletAddress}>
          {formatWalletAddress(wallet.address)}
        </Text>
        <TouchableOpacity onPress={copyAddress}>
          <Ionicons
            name="copy-outline"
            size={16}
            color="#666"
            style={styles.copyIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
