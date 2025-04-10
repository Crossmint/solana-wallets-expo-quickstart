import Button from "@/app/components/ui/Button";
import useWallet from "@/app/hooks/useWallet";
import type { TokenSymbol } from "@/app/types/wallet";
import { createTokenTransferTransaction } from "@/app/utils";
import { usdcDevnetTokenMint } from "@/app/utils/config";
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function TransferForm() {
  // TODO: Replace when we have auth
  const { wallet } = useWallet("solana-smart-wallet", {});
  const [amount, setAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [selectedToken, setSelectedToken] = useState<TokenSymbol>("SOL");

  const handleTransfer = useCallback(async () => {
    const transaction = await createTokenTransferTransaction(
      "EbXL4e6XgbcC7s33cD5EZtyn5nixRDsieBjPQB7zf448",
      recipientAddress,
      usdcDevnetTokenMint,
      Number(amount)
    );

    console.log("Transaction created");
    console.log({ transaction });

    // Reset form after submission
    setAmount("");
    setRecipientAddress("");
  }, [amount, recipientAddress]);

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
            <Text
              style={
                selectedToken === "USDC" ? styles.selectedTokenText : undefined
              }
            >
              USDC
            </Text>
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
            <Text
              style={
                selectedToken === "SOL" ? styles.selectedTokenText : undefined
              }
            >
              SOL
            </Text>
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

        <Button
          title="Transfer"
          onPress={handleTransfer}
          disabled={!amount || !recipientAddress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  formSection: {
    width: "100%",
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  tokenSelector: {
    flexDirection: "row",
    marginBottom: 16,
  },
  tokenOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
    paddingVertical: 8,
  },
  selectedTokenText: {
    fontWeight: "600",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#00C853",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#00C853",
  },
});
