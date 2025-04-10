import type { WalletTypeToArgs } from "@crossmint/wallets-sdk";
import { useQuery } from "@tanstack/react-query";
import { CrossmintWallets } from "@crossmint/wallets-sdk";
import { walletApiKey } from "@/app/utils/config";

export default function useWallet<T extends keyof WalletTypeToArgs>(
  type: T,
  args: WalletTypeToArgs[T],
  jwt?: string
) {
  const {
    data: walletsService,
    isLoading: isLoadingService,
    error: serviceError,
    isError: isServiceError,
  } = useQuery({
    queryKey: ["walletsService", jwt],
    queryFn: () => {
      if (!jwt) {
        return null;
      }

      console.log("Jwt received successfully");
      console.log({ jwt });
      return CrossmintWallets.from({
        apiKey: walletApiKey,
        jwt,
      });
    },
    enabled: !!jwt,
  });

  const {
    data: wallet,
    isLoading: isLoadingWallet,
    error: walletError,
    isError: isWalletError,
    refetch: refetchWallet,
  } = useQuery({
    queryKey: ["wallet", type, args, jwt],
    queryFn: async () => {
      if (!walletsService) {
        return null;
      }
      console.log("Getting wallet");
      try {
        const result = await walletsService.getOrCreateWallet(type, args);
        console.log("Wallet retrieved successfully");
        console.log({ wallet: result.getAddress() });
        return result;
      } catch (error) {
        console.error("Wallet error details:", JSON.stringify(error));
        throw error;
      }
    },
    enabled: !!walletsService,
  });

  const isLoading = isLoadingService || isLoadingWallet;
  const error = serviceError ?? walletError;
  const isError = isServiceError || isWalletError;

  return {
    walletsService,
    wallet,

    isLoading,
    isLoadingService,
    isLoadingWallet,

    error,
    isError,
    serviceError,
    isServiceError,
    walletError,
    isWalletError,

    isConnected: !!wallet && !isLoading && !isError,

    reload: refetchWallet,
  };
}
