export type TokenSymbol = "SOL" | "USDC";

export interface Token {
  symbol: TokenSymbol;
  name: string;
  balance: string;
  logo: string;
}

export interface Wallet {
  address: string;
  tokens: Token[];
}

export interface TransferParams {
  token: TokenSymbol;
  amount: string;
  recipientAddress: string;
}

export interface DelegatedSignerParams {
  signerAddress: string;
}
