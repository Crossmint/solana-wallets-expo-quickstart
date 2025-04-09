import { Image, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import AppLayout from "@/app/components/layout/AppLayout";
import Button from "@/app/components/ui/Button";

export default function LoginScreen() {
  const handleLogin = () => {
    console.log("Simulating login...");
    try {
      router.push("/wallet");
    } catch (e) {
      console.error("Navigation error:", e);
    }
  };

  return (
    <AppLayout>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            source={{
              uri: "https://www.crossmint.com/assets/crossmint/logo/v2",
            }}
            style={styles.logo}
          />
          <Text style={styles.title}>Solana Wallets Quickstart</Text>
          <Text style={styles.subtitle}>The easiest way to build onchain</Text>

          <View style={styles.buttonContainer}>
            <Button title="Login" onPress={handleLogin} />
          </View>
        </View>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
    marginTop: "20%",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 40,
    resizeMode: "contain",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 24,
  },
});
