'use client'

import { Toaster, toast } from 'react-hot-toast'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { NFTGrid } from './components/NFTGrid'

export default function App() {
  return (
      <main className="min-h-screen bg-gradient-to-br from-[#0e0524] via-[#1a0d3a] to-[#0e0524] text-white flex flex-col items-center justify-start px-4 sm:px-10">
        <div className="w-full max-w-6xl">
        <header className="w-full flex justify-between items-center py-6 max-w-6xl">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-violet-400">
            Materialize Market
          </h1>
          <div className="bg-white/10 px-4 py-2 rounded-xl border border-fuchsia-500/30 backdrop-blur-md">
            <WalletMultiButton />
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mt-10 sm:mt-20 mb-12 px-4">
          <img
            src="/logo2.jpg"
            alt="Materialize Market Logo"
            className="w-24 h-24 sm:w-32 sm:h-32 squared-full mb-6 drop-shadow-[0_0_20px_rgba(236,72,153,0.4)]"
          />
          <h2 className="text-4xl sm:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
            Reverse RWA for the Real World
          </h2>
          <p className="text-purple-200 max-w-2xl text-lg mb-8">
            Claim your digital sheep and get the physical engraved stand at our booth.  
            Physical first — tokenized after. That’s <b>Reverse RWA.</b>
          </p>
          <a href="#claim">
            <button className="bg-fuchsia-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-fuchsia-400 transition">
              Connect Wallet & Claim NFT →
            </button>
          </a>
        </section>

        {/* NFT Claim Section */}
        <section id="claim" className="w-full max-w-6xl">
          <NFTGrid
              toast={{
                success: (msg: string) => toast.success(msg),
                error: (msg: string) => toast.error(msg),
                warn: (msg: string) =>
                  toast.custom(
                    (t) => (
                      <div
                        className={`${
                          t.visible ? 'animate-enter' : 'animate-leave'
                        } bg-yellow-400 text-black px-4 py-2 rounded-lg shadow-lg`}
                      >
                        ⚠️ {msg}
                      </div>
                    ),
                    { duration: 3000 }
                  ),
              }}
            />
        </section>

        {/* Footer */}
        <footer className="mt-20 py-6 text-center text-purple-400 text-sm border-t border-purple-800/30 w-full">
          © {new Date().getFullYear()} Materialize Labs · Built for Hackathons ⚡
        </footer>

        <Toaster position="top-center" />
        </div>
      </main>
  )
}
