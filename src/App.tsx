'use client'

import toast, { Toaster } from 'react-hot-toast'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { NFTGrid } from './components/NFTGrid'
import { SolanaWalletProvider } from './components/SolanaWalletProvider'

export default function App() {
  return (
    <SolanaWalletProvider>
      <main className="min-h-screen bg-gradient-to-br from-brand via-[#1a0d3a] to-brand text-white flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-5xl">
          <header className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-extrabold text-accent drop-shadow-[0_0_10px_rgba(245,179,82,0.5)]">
              Materialize It!
            </h1>
            <div className="bg-white/10 px-4 py-2 rounded-xl border border-accent/40 backdrop-blur-md">
              <WalletMultiButton />
            </div>
          </header>

          <section className="text-center mt-10 mb-12">
            <img
              src="/logo2.jpg"
              alt="Materialize Logo"
              className="w-42 h-24 sm:w-42 sm:h-24 mx-auto squared-full mb-6 shadow-[0_0_25px_rgba(245,179,82,0.4)]"
            />
            <h2 className="text-4xl sm:text-5xl font-bold text-accent mb-4">
              Reverse RWA for the Real World
            </h2>
            <h3 className="text-purple-200 max-w-2xl mx-auto mb-8">
              Claim your digital sheep and get the engraved pendant at our booth.
            </h3>
          </section>

          <NFTGrid
            toast={{
              success: (msg: string) => toast.success(msg),
              error: (msg: string) => toast.error(msg),
              warn: (msg: string) => toast(msg),
            }}
          />

          <footer className="mt-12 py-6 text-center text-purple-400 text-sm border-t border-accent/30">
            © {new Date().getFullYear()} Materialize Labs · Built for the Real World ⚡
          </footer>
        </div>
        <Toaster position="top-center" />
      </main>
    </SolanaWalletProvider>
  )
}