import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useCrossmintAuth } from "@crossmint/client-sdk-react-native-ui";
import { Ionicons } from "@expo/vector-icons";

export default function Logout() {
  const { logout } = useCrossmintAuth();
  return (
    <TouchableOpacity style={styles.logoutButton} onPress={logout}>
      <Text style={styles.logoutText}>Logout</Text>
      <Ionicons name="log-out-outline" size={16} color="#666" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  logoutText: {
    fontSize: 14,
    color: "#666",
  },
});
