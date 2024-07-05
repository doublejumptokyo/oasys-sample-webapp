'use client';

import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

import { customChains } from './chains';
import { featuredWalletIds } from './wallets';
import { siweConfig } from './siwe';

export const walletConnectProjectId = process.env.NEXT_PUBLIC_PROJECT_ID || '';

const metadata = {
  name: 'Web3Modal',
  description: 'DJT Sample',
  url: 'http://localhost', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

export const config = defaultWagmiConfig({
  projectId: walletConnectProjectId,
  metadata,
  chains: customChains,
  enableCoinbase: false, // Enabling by default is buggy, so adding it as featured wallet works better
  auth: {
    email: true, // default to true
    socials: ['google', 'x', 'github', 'discord', 'apple'],
    showWallets: true, // default to true
    walletFeatures: true, // default to true
  },
});

createWeb3Modal({
  wagmiConfig: config,
  siweConfig,
  projectId: walletConnectProjectId,
  featuredWalletIds,
});
