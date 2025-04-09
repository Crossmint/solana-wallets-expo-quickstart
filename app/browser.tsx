import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function BrowserScreen() {
  const [url, setUrl] = useState("https://jup.ag/");
  const [currentUrl, setCurrentUrl] = useState("https://jup.ag/");
  const router = useRouter();

  const handleUrlSubmit = () => {
    // Add https:// if not present
    let processedUrl = url;
    if (!/^https?:\/\//i.test(processedUrl)) {
      processedUrl = `https://${processedUrl}`;
    }
    setCurrentUrl(processedUrl);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Browser", headerShown: true }} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <View style={styles.addressBar}>
          <TextInput
            style={styles.urlInput}
            value={url}
            onChangeText={setUrl}
            placeholder="Enter URL"
            autoCapitalize="none"
            keyboardType="url"
            returnKeyType="go"
            onSubmitEditing={handleUrlSubmit}
          />
          <TouchableOpacity onPress={handleUrlSubmit}>
            <Ionicons name="arrow-forward" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <WebView
        source={{ uri: currentUrl }}
        style={styles.webview}
        onNavigationStateChange={(navState) => {
          setUrl(navState.url);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    marginRight: 10,
  },
  addressBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  urlInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  webview: {
    flex: 1,
  },
});
