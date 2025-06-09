<div align="center">
<img width="200" alt="Image" src="https://github.com/user-attachments/assets/8b617791-cd37-4a5a-8695-a7c9018b7c70" />
<br>
<br>
<h1>Solana Wallets Expo Quickstart</h1>

<div align="center">
<a href="https://solana-wallets.demos-crossmint.com/">Live Demo</a> | <a href="https://docs.crossmint.com/introduction/platform/wallets">Docs</a> | <a href="https://github.com/crossmint">See all quickstarts</a>
</div>

<br>
<br>
<img src="https://github.com/user-attachments/assets/76a983ab-499e-4d12-af7a-0ae17cb0b6cd" alt="Image" width="full">
</div>

## Introduction

Create and interact with Crossmint wallets in Solana using Crossmint Auth to handle user authentication.

**Learn how to:**

- Create a wallet
- View its balance for SOL and SPL tokens
- Send a transaction
- Add delegated signers to allow third parties to sign transactions on behalf of your wallet

## Setup

1. Clone the repository and navigate to the project folder:

```bash
git clone https://github.com/crossmint/solana-wallets-expo-quickstart.git && cd solana-wallets-expo-quickstart
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

4. Set up your Crossmint client API key:

   a. Generate a Crossmint client API key from [here](https://docs.crossmint.com/introduction/platform/api-keys/client-side).

   b. Make sure your API key has the following scopes: `users.create`, `users.read`, `wallets.read`, `wallets.create`, `wallets:transactions.create`, `wallets:transactions.sign`, `wallets:balance.read`, `wallets.fund`.

   c. To authenticate requests from your app, whitelist the app domain by selecting "Mobile" under "App type" and entering your iOS bundle ID and Android package name from `app.json` (by default this quickstart uses "com.crossmint.solana.wallets").

5. Add the API key to the `.env` file.

```bash
EXPO_PUBLIC_CLIENT_CROSSMINT_API_KEY=your_api_key
```

6. Run the development server:

```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun start
```

Note: When running an iOS development build, make sure you're running the latest version on the simulator (>iOS 18).

## Using in production

1. Create a [production API key](https://docs.crossmint.com/introduction/platform/api-keys/client-side).

## Errors when running in iOS simulator

If you encounter errors trying to run the expo app on iOS, try running:

```bash
npx expo install --fix
```
