<div align="center">
<img width="200" alt="Image" src="https://github.com/user-attachments/assets/8b617791-cd37-4a5a-8695-a7c9018b7c70" />
<br>
<br>
<h1>Expo Solana Wallets Quickstart</h1>

<div align="center">
<a href="https://solana-wallets.demos-crossmint.com/">Live Demo</a> | <a href="https://docs.crossmint.com/introduction/platform/wallets">Docs</a> | <a href="https://github.com/crossmint">See all quickstarts</a>
</div>

<br>
<br>
<img src="https://github.com/user-attachments/assets/76a983ab-499e-4d12-af7a-0ae17cb0b6cd" alt="Image" width="full">
</div>

## Introduction
Create and interact with Crossmint wallets in Solana. This quickstart uses Crossmint Auth to login and create a smart wallet.

**Learn how to:**
- Create a wallet
- View its balance for SOL and SPL tokens
- Send a transaction
- Add delegated signers to allow third parties to sign transactions on behalf of your wallet

## Deploy
Easily deploy the template to Vercel with the button below. You will need to set the required environment variables in the Vercel dashboard.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FCrossmint%2Fsolana-smart-wallet-quickstart&env=NEXT_PUBLIC_CROSSMINT_API_KEY)

## Setup
1. Clone the repository and navigate to the project folder:
```bash
git clone https://github.com/crossmint/expo-solana-smart-wallet-quickstart.git && cd expo-solana-smart-wallet-quickstart
```

2. Install all dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up the environment variables:
```bash
cp .env.template .env
```

4. Get a Crossmint API key from [here](https://docs.crossmint.com/introduction/platform/api-keys/client-side) and add it to the `.env` file.
```bash
EXPO_PUBLIC_CLIENT_CROSSMINT_API_KEY=your_api_key
```

5. Run the development server:
```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun start
```
