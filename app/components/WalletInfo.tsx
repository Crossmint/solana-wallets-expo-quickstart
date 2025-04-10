import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import TokenItem from "@/app/components/ui/TokenItem";
import Button from "@/app/components/ui/Button";
import { router } from "expo-router";
import useWallet from "@/app/hooks/useWallet";
import type { Token } from "@/app/types/wallet";
import { jwt } from "@/app/utils/config";

const formatBalance = (balance: string, decimals: number) => {
  return (Number(balance) / 10 ** decimals).toFixed(2);
};

const initialTokens: Token[] = [
  {
    symbol: "SOL",
    name: "Solana",
    balance: "0",
    logo: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=040",
  },
  {
    symbol: "USDC",
    name: "USDC",
    balance: "0",
    logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=040",
  },
];

type WalletInfoProps = {
  onLogout: () => void;
};

export default function WalletInfo({ onLogout }: WalletInfoProps) {
  // TODO: Replace when we have auth
  const { wallet } = useWallet("solana-smart-wallet", {}, jwt);
  const [tokens, setTokens] = useState<Token[]>(initialTokens);

  useEffect(() => {
    const fetchBalances = async () => {
      if (!wallet) {
        return;
      }
      try {
        const balances = await wallet.balances(["sol", "usdc"]);
        if (!Array.isArray(balances)) {
          return;
        }

        const solBalance = formatBalance(
          balances.find((t) => t.token === "sol")?.balances.total || "0",
          9
        );
        const usdcBalance = formatBalance(
          balances.find((t) => t.token === "usdc")?.balances.total || "0",
          6
        );

        setTokens(
          tokens.map((t) => {
            if (t.symbol === "SOL") {
              return { ...t, balance: solBalance };
            }
            if (t.symbol === "USDC") {
              return { ...t, balance: usdcBalance };
            }
            return t;
          })
        );
      } catch (error) {
        console.error("Error fetching wallet balances:", error);
      }
    };
    fetchBalances();
  }, [wallet, tokens]);

  const handleCopyAddress = async () => {
    if (wallet?.getAddress()) {
      await Clipboard.setStringAsync(wallet.getAddress());
    }
  };

  const handleOpenBrowser = () => {
    try {
      router.push("/browser");
    } catch (e) {
      console.error("Navigation error:", e);
    }
  };

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

  if (!wallet) {
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
          <Text style={styles.walletAddress}>{wallet.getAddress()}</Text>
          <TouchableOpacity
            style={styles.copyButton}
            onPress={handleCopyAddress}
          >
            <Ionicons name="copy-outline" size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tokenContainer}>
        {tokens.map((token) => (
          <TokenItem key={token.symbol} token={token} />
        ))}
      </View>

      <View style={styles.actionButtons}>
        <Button
          title="+ Get free test SOL"
          variant="secondary"
          onPress={getTestSol}
        />
        <View style={styles.spacer} />
        <Button
          title="+ Get test USDC"
          variant="secondary"
          onPress={getTestUsdc}
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
