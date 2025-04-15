import type React from "react";
import { StyleSheet } from "react-native";
import type { TokenSymbol } from "../types/wallet";
import SolanaLogo from "./icons/SolanaIcon";
import UsdcLogo from "./icons/USDCIcon";

const TOKEN_LOGOS: Record<TokenSymbol, React.JSX.Element> = {
	SOL: <SolanaLogo />,
	USDC: <UsdcLogo />,
};

type TokenLogoProps = {
	symbol: TokenSymbol;
	size?: number;
};

export default function TokenLogo({ symbol, size = 24 }: TokenLogoProps) {
	const icon = TOKEN_LOGOS[symbol];

	if (!icon) {
		return null;
	}

	return icon;
}

const styles = StyleSheet.create({
	logo: {
		resizeMode: "contain",
	},
});
