export const walletApiKey = process.env
	.EXPO_PUBLIC_CLIENT_WALLET_API_KEY as string;

export const usdcDevnetTokenMint =
	"4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU";

if (!walletApiKey) {
	throw new Error("EXPO_PUBLIC_CLIENT_WALLET_API_KEY is not set");
}
