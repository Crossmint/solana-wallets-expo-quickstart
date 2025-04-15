export const apiKey = process.env
	.EXPO_PUBLIC_CLIENT_CROSSMINT_API_KEY as string;

export const usdcDevnetTokenMint =
	"4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU";

if (!apiKey) {
	throw new Error("EXPO_PUBLIC_CLIENT_CROSSMINT_API_KEY is not set");
}
