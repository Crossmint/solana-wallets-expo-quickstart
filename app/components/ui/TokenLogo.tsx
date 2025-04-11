import React from "react";
import { Image, StyleSheet, type ImageSourcePropType } from "react-native";
import type { TokenSymbol } from "@/app/types/wallet";

const TOKEN_LOGOS: Record<TokenSymbol, ImageSourcePropType> = {
  SOL: require("@/assets/images/solana-sol-logo.png"),
  USDC: require("@/assets/images/usd-coin-usdc-logo.png"),
};

type TokenLogoProps = {
  symbol: TokenSymbol;
  size?: number;
};

export default function TokenLogo({ symbol, size = 24 }: TokenLogoProps) {
  return (
    <Image
      source={TOKEN_LOGOS[symbol]}
      style={[styles.logo, { width: size, height: size }]}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    resizeMode: "contain",
  },
});
