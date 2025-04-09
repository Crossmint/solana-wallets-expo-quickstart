import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useTestSol, useWalletData } from "@/app/hooks/useWallet";
import TokenItem from "@/app/components/ui/TokenItem";
import Button from "@/app/components/ui/Button";
import { router } from "expo-router";

type WalletInfoProps = {
  onLogout: () => void;
};

export default function WalletInfo({ onLogout }: WalletInfoProps) {
  const { data: wallet, isLoading } = useWalletData();
  const { mutate: getTestSol, isPending: isGettingTestSol } = useTestSol();

  const handleCopyAddress = async () => {
    if (wallet?.address) {
      await Clipboard.setStringAsync(wallet.address);
    }
  };

  const handleOpenBrowser = () => {
    try {
      router.push("/browser");
    } catch (e) {
      console.error("Navigation error:", e);
    }
  };

  if (isLoading || !wallet) {
    return (
      <View style={styles.container}>
        <Text>Loading wallet information...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.walletHeader}>
        <Text style={styles.walletTitle}>Your wallet</Text>
        <View style={styles.addressContainer}>
          <Text style={styles.walletAddress}>{wallet.address}</Text>
          <TouchableOpacity
            style={styles.copyButton}
            onPress={handleCopyAddress}
          >
            <Ionicons name="copy-outline" size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tokenContainer}>
        {wallet.tokens.map((token) => (
          <TokenItem key={token.symbol} token={token} />
        ))}
      </View>

      <View style={styles.actionButtons}>
        <Button
          title="+ Get free test SOL"
          variant="secondary"
          onPress={() => getTestSol()}
          disabled={isGettingTestSol}
        />
        <View style={styles.spacer} />
        <Button
          title="+ Get test USDC (coming soon)"
          variant="secondary"
          disabled
        />
        <View style={styles.spacer} />
        <Button
          title="Browse"
          variant="secondary"
          onPress={handleOpenBrowser}
        />
        <View style={styles.spacer} />
        <Button title="Log out" variant="secondary" onPress={onLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  walletHeader: {
    marginBottom: 20,
  },
  walletTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  walletAddress: {
    fontSize: 16,
    color: "#666",
  },
  copyButton: {
    marginLeft: 8,
    padding: 4,
  },
  tokenContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  actionButtons: {
    marginTop: 20,
  },
  spacer: {
    height: 12,
  },
});
