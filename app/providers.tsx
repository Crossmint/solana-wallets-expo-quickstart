import {
	CrossmintAuthProvider,
	CrossmintProvider,
	CrossmintWalletProvider,
} from "@crossmint/client-sdk-react-native-ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { apiKey, appId } from "@/lib/config";

const queryClient = new QueryClient();

type ProvidersProps = {
	children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<CrossmintProvider apiKey={apiKey} appId={appId}>
				<CrossmintAuthProvider>
					<CrossmintWalletProvider>{children}</CrossmintWalletProvider>
				</CrossmintAuthProvider>
			</CrossmintProvider>
		</QueryClientProvider>
	);
}
