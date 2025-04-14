import { walletApiKey } from "@/app/utils/config";
import type { ReactNode } from "react";
import {
	CrossmintAuthProvider,
	CrossmintProvider,
	CrossmintWalletProvider,
} from "@crossmint/client-sdk-react-native-ui";

export default function CrossmintProviders({
	children,
}: { children: ReactNode }) {
	return (
		<CrossmintProvider apiKey={walletApiKey}>
			<CrossmintAuthProvider>
				<CrossmintWalletProvider>{children}</CrossmintWalletProvider>
			</CrossmintAuthProvider>
		</CrossmintProvider>
	);
}
