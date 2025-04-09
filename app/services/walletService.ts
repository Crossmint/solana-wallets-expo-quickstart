import { createTokenTransferTransaction } from "@/app/utils";
import type {
  Wallet,
  TransferParams,
  DelegatedSignerParams,
} from "../types/wallet";
import type { Token, TokenSymbol } from "../types/wallet";
import { usdcDevnetTokenMint } from "@/app/utils/config";

// Mock data for wallet info
const mockTokens: Token[] = [
  {
    symbol: "SOL",
    name: "Solana",
    balance: "0.00 SOL",
    logo: "◎",
  },
  {
    symbol: "USDC",
    name: "USDC",
    balance: "$ 2.00",
    logo: "$",
  },
];

export const walletService = {
  /**
   * Get wallet information
   */
  getWallet: async (): Promise<Wallet> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return mock wallet data
    return {
      address: "DL82...paiM",
      tokens: mockTokens,
    };
  },

  /**
   * Transfer tokens
   */
  transferTokens: async (params: TransferParams): Promise<boolean> => {
    console.log("Transfer initiated:", params);

    const { token, amount, recipientAddress } = params;

    const transaction = await createTokenTransferTransaction(
      "EbXL4e6XgbcC7s33cD5EZtyn5nixRDsieBjPQB7zf448",
      recipientAddress,
      usdcDevnetTokenMint,
      Number(amount)
    );

    console.log("Transaction created");
    console.log({ transaction });

    // Simulate success
    return true;
  },

  /**
   * Add delegated signer
   */
  addDelegatedSigner: async (
    params: DelegatedSignerParams
  ): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Add delegated signer:", params);

    // Simulate success
    return true;
  },

  /**
   * Get test SOL (airdrop)
   */
  getTestSol: async (): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Getting test SOL");

    // Simulate success
    return true;
  },
};
