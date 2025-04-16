import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  useWallet,
  type WalletBalance,
} from "@crossmint/client-sdk-react-native-ui";
import { Linking } from "react-native";

const formatBalance = (balance: string, decimals: number) => {
  return (Number(balance) / 10 ** decimals).toFixed(2);
};

export default function Balance() {
  const { wallet, type, getOrCreateWallet } = useWallet();
  const [balances, setBalances] = useState<WalletBalance>([]);

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
      if (wallet == null || type !== "solana-smart-wallet") {
        return;
      }
      try {
        const balances = await wallet.getBalances(["sol", "usdc"]);
        setBalances(balances);
      } catch (error) {
        console.error("Error fetching wallet balances:", error);
        Alert.alert("Error fetching wallet balances", `${error}`);
      }
    };
    fetchBalances();
  }, [wallet, type]);

  const solBalance =
    balances?.find((t) => t.token === "sol")?.balances.total || "0";
  const usdcBalance =
    balances?.find((t) => t.token === "usdc")?.balances.total || "0";

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
        <View style={styles.tokenContainer}>
          <View style={styles.tokenInfo}>
            <View style={styles.iconContainer}>
              <Image
                source={require("../assets/images/solana.png")}
                style={styles.tokenIcon}
              />
            </View>
            <Text style={styles.tokenSymbol}>SOL</Text>
          </View>
          <Text style={styles.tokenBalance}>
            {formatBalance(solBalance, 9)} SOL
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.tokenContainer}>
          <View style={styles.tokenInfo}>
            <View style={styles.iconContainer}>
              <Image
                source={require("../assets/images/usdc.png")}
                style={styles.tokenIcon}
              />
            </View>
            <Text style={styles.tokenSymbol}>USDC</Text>
          </View>
          <Text style={styles.tokenBalance}>
            ${formatBalance(usdcBalance, 6)}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => Linking.openURL("https://faucet.solana.com")}
        >
          <View style={styles.buttonIconContainer}>
            <Image
              source={require("../assets/images/solana.png")}
              style={styles.buttonIcon}
            />
          </View>
          <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
            Get test SOL
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => Linking.openURL("https://faucet.circle.com")}
        >
          <View style={styles.buttonIconContainer}>
            <Image
              source={require("../assets/images/usdc.png")}
              style={styles.buttonIcon}
            />
          </View>
          <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
            Get test USDC
          </Text>
        </TouchableOpacity>
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
  tokenContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  tokenInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
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
  tokenBalance: {
    fontSize: 16,
    color: "#000",
  },
  tokenIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
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
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },
  buttonTextSecondary: {
    color: "#000",
  },
  buttonIconContainer: {
    marginRight: 8,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
});
