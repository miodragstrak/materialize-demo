'use client'

import type { ReactNode } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { clusterApiUrl } from '@solana/web3.js'
import '@solana/wallet-adapter-react-ui/styles.css'

// ✅ use WalletAdapterNetwork, not Cluster
const network = WalletAdapterNetwork.Devnet
const endpoint = clusterApiUrl(network)

export function SolanaWalletProvider({ children }: { children: ReactNode }) {
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter({ network }),
  ]

  return (
    <ConnectionProvider endpoint={endpoint}>
      {/* 👇 critical: prevent infinite reconnect loop */}
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
