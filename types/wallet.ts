export type TokenSymbol = "SOL" | "USDC";

export interface TokenDefinition {
	symbol: TokenSymbol;
	name: string;
}

export interface Token extends TokenDefinition {
	balance: string;
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
