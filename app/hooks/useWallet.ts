import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { TransferParams, DelegatedSignerParams } from "../types/wallet";
import { walletService } from "../services/walletService";

const WALLET_QUERY_KEY = "wallet";

export function useWalletData() {
  return useQuery({
    queryKey: [WALLET_QUERY_KEY],
    queryFn: walletService.getWallet,
  });
}

export function useTokenTransfer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: walletService.transferTokens,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WALLET_QUERY_KEY] });
    },
  });
}

export function useDelegatedSigner() {
  return useMutation({
    mutationFn: walletService.addDelegatedSigner,
  });
}

export function useTestSol() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: walletService.getTestSol,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [WALLET_QUERY_KEY] });
    },
  });
}
