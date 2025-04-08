import { walletApiKey, appId } from "@/src/utils/config";
import type { ReactNode } from "react";
import {
  CrossmintProvider,
  CrossmintWalletProvider,
} from "@crossmint/client-sdk-react-native-ui";

export default function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <CrossmintProvider apiKey={walletApiKey} appId={appId}>
      <CrossmintWalletProvider>{children}</CrossmintWalletProvider>
    </CrossmintProvider>
  );
}
