'use client';

import * as React from 'react';

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';

import { config } from '@/config/wagmi';
import WalletProvider from '@/context/WalletProvider';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    // <SessionProvider>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider>{mounted && children}</WalletProvider>
      </QueryClientProvider>
    </WagmiProvider>
    // </SessionProvider>
  );
}
