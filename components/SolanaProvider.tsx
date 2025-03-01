'use client';

import React from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { Toaster } from './ui/sonner';

export default function SolanaProvider({ children }: { children: React.ReactNode }) {



  return (
    <ConnectionProvider endpoint={"https://devnet.helius-rpc.com/?api-key=27f1c4d3-27d9-4e03-aa56-e6c122f456a2"} >
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          {children}
          <Toaster />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}