'use client'

import toast, { Toaster } from 'react-hot-toast'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { NFTGrid } from './components/NFTGrid'

export default function App() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0e0524] via-[#1a0d3a] to-[#0e0524] text-white overflow-y-auto sm:overflow-hidden sm:h-screen">
      {/* Outer centering container */}
      <div className="w-full max-w-3xl mx-auto px-4 flex flex-col justify-center items-center sm:h-[90vh]">
        {/* Header */}
        <header className="w-full flex justify-between items-center py-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-violet-400">
            Materialize Market
          </h1>
          <div className="bg-white/10 px-4 py-2 rounded-xl border border-fuchsia-500/30 backdrop-blur-md">
            <WalletMultiButton />
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mt-10 sm:mt-16 mb-10">
          <img
            src="/logo2.jpg"
            alt="Materialize Market Logo"
            className="w-24 h-24 sm:w-32 sm:h-32 squared-full mb-6 drop-shadow-[0_0_20px_rgba(236,72,153,0.4)]"
          />
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
            Reverse RWA for the Real World
          </h2>
          <p className="text-purple-200 max-w-md text-lg mb-8 leading-relaxed">
            Claim your digital sheep and get the physical engraved stand at our booth.  
            Physical first — tokenized after. That’s <b>Reverse RWA.</b>
          </p>
        </section>

        {/* NFT Claim Section */}
        <div className="transform scale-95 sm:scale-100 transition-transform duration-300 w-full">
          <NFTGrid
            toast={{
              success: (msg: string) => toast.success(msg),
              error: (msg: string) => toast.error(msg),
              warn: (msg: string) =>
                toast((t) => (
                  <div
                    className={`${
                      t.visible ? 'animate-enter' : 'animate-leave'
                    } bg-yellow-400 text-black px-4 py-2 rounded-lg shadow-lg`}
                  >
                    ⚠️ {msg}
                  </div>
                )),
            }}
          />
        </div>

        {/* Footer */}
        <footer className="mt-16 py-6 text-center text-purple-400 text-sm border-t border-purple-800/30 w-full">
          © {new Date().getFullYear()} Materialize Labs · Built for Hackathons ⚡
        </footer>

        <Toaster position="top-center" />
      </div>
    </main>
  )
}
