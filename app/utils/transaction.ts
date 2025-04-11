import {
	TransactionMessage,
	PublicKey,
	VersionedTransaction,
	Connection,
	SystemProgram,
	LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
	createTransferInstruction,
	getAssociatedTokenAddress,
	TOKEN_PROGRAM_ID,
	createAssociatedTokenAccountInstruction,
	ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

export const createTokenTransferTransaction = async (
	from: string,
	to: string,
	tokenMint: string,
	amount: number,
) => {
	const fromPublicKey = new PublicKey(from);
	const toPublicKey = new PublicKey(to);
	const tokenMintPublicKey = new PublicKey(tokenMint);

	const senderTokenAccount = await getAssociatedTokenAddress(
		tokenMintPublicKey,
		fromPublicKey,
		true, // allowOwnerOffCurve
		TOKEN_PROGRAM_ID,
		ASSOCIATED_TOKEN_PROGRAM_ID,
	);

	console.log("Sender token account:", senderTokenAccount);

	const recipientTokenAccount = await getAssociatedTokenAddress(
		tokenMintPublicKey,
		toPublicKey,
	);

	console.log("Recipient token account:", recipientTokenAccount);

	const amountInBaseUnits = amount * 1_000_000;

	const instructions = [];
	const recipientAccountInfo = await connection.getAccountInfo(
		recipientTokenAccount,
	);
	console.log("Recipient account info:", recipientAccountInfo);
	if (!recipientAccountInfo) {
		instructions.push(
			createAssociatedTokenAccountInstruction(
				fromPublicKey,
				recipientTokenAccount,
				toPublicKey,
				tokenMintPublicKey,
				TOKEN_PROGRAM_ID,
				ASSOCIATED_TOKEN_PROGRAM_ID,
			),
		);
	}

	instructions.push(
		createTransferInstruction(
			senderTokenAccount,
			recipientTokenAccount,
			fromPublicKey,
			amountInBaseUnits,
			[],
			TOKEN_PROGRAM_ID,
		),
	);

	const { blockhash } = await connection.getLatestBlockhash("confirmed");

	const message = new TransactionMessage({
		instructions,
		recentBlockhash: blockhash,
		payerKey: fromPublicKey,
	}).compileToV0Message();

	return new VersionedTransaction(message);
};

export const createNativeTransferTransaction = async (
	from: string,
	to: string,
	amount: number,
) => {
	const fromPublicKey = new PublicKey(from);
	const toPublicKey = new PublicKey(to);
	const amountInLamports = amount * LAMPORTS_PER_SOL;
	const instructions = [
		SystemProgram.transfer({
			fromPubkey: fromPublicKey,
			toPubkey: toPublicKey,
			lamports: amountInLamports,
		}),
	];
	const { blockhash } = await connection.getLatestBlockhash("confirmed");
	const message = new TransactionMessage({
		instructions,
		recentBlockhash: blockhash,
		payerKey: fromPublicKey,
	}).compileToV0Message();
	return new VersionedTransaction(message);
};

export default createTokenTransferTransaction;
