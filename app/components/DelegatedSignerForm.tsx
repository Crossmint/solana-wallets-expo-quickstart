import Button from "@/app/components/ui/Button";
import { useDelegatedSigner } from "@/app/hooks/useWallet";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function DelegatedSignerForm() {
  const [delegatedSignerAddress, setDelegatedSignerAddress] = useState("");
  const { mutate: addDelegatedSigner, isPending } = useDelegatedSigner();

  const handleAddDelegatedSigner = () => {
    addDelegatedSigner({ signerAddress: delegatedSignerAddress });
    // Reset form after submission
    setDelegatedSignerAddress("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Delegated Signer</Text>
      <Text style={styles.sectionSubtitle}>
        Allow other signers to sign transactions on behalf of the wallet.
      </Text>

      <Text style={styles.formLabel}>Delegated Signer</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 5YNmS1R9nNSCDzb5a7mMJ1dwK9UHeA"
        value={delegatedSignerAddress}
        onChangeText={setDelegatedSignerAddress}
      />

      <Button
        title="Add Delegated Signer"
        onPress={handleAddDelegatedSigner}
        disabled={!delegatedSignerAddress || isPending}
      />
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
});
