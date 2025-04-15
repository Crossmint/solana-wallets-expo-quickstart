import {
	CrossmintAuthProvider,
	CrossmintProvider,
	CrossmintWalletProvider,
} from "@crossmint/client-sdk-react-native-ui";
import { apiKey } from "@/lib/config";

type ProvidersProps = {
	children: React.ReactNode;
};

export default function CrossmintProviders({ children }: ProvidersProps) {
	return (
		<CrossmintProvider apiKey={apiKey}>
			<CrossmintAuthProvider>
				<CrossmintWalletProvider>{children}</CrossmintWalletProvider>
			</CrossmintAuthProvider>
		</CrossmintProvider>
	);
}
