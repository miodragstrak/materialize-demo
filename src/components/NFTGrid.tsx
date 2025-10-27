import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWallet } from '@solana/wallet-adapter-react'
import { sendClaimEmail } from '../lib/sendClaimEmail'
import { ClaimModal } from './ClaimModal'

const nfts = [
  { id: 1, name: 'Bardoka', image: '/nft1.jpg', flags: '🇷🇸 🇲🇪 🇦🇱',
    desc: 'A multi-purpose breed found across Serbia, Montenegro, and Albania. Valued for milk, meat, and wool.' },
  { id: 2, name: 'Pag Sheep', image: '/nft2.jpg', flags: '🇭🇷',
    desc: 'Famous for the world-known “Paški sir” cheese; a small island breed adapted to harsh coastal winds.' },
  { id: 3, name: 'Vitoroga', image: '/nft3.jpg', flags: '🇷🇸 🇲🇪 🇧🇦 🇦🇱',
    desc: 'Hardy mountain sheep known for its spiral horns and dense wool; iconic across the Western Balkans.' },
]

type ToastType = {
  success: (msg: string) => void
  error: (msg: string) => void
  warn: (msg: string) => void
}

export function NFTGrid({ toast }: { toast: ToastType }) {
  const { publicKey } = useWallet()
  const [index, setIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [claimedNFT, setClaimedNFT] = useState<string | null>(null)

  const nft = nfts[index]

  const handleClaim = async () => {
    if (!publicKey) return toast.error('⚠️ Connect wallet first!')
    const walletAddress = publicKey.toBase58()
    const success = await sendClaimEmail(walletAddress, nft.name)
    if (success) {
      setClaimedNFT(nft.name)
      setShowModal(true)
      toast.success(`✅ Claimed ${nft.name}`)
    } else toast.error('❌ Error saving claim')
  }

  return (
    <div className="flex flex-col items-center text-center w-full mt-10 mb-20">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-fuchsia-400">
        Choose Your Balkan Sheep NFT 🐑
      </h2>

      <div className="relative w-full max-w-sm sm:max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={nft.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl bg-[#15092f] border border-fuchsia-800/30 p-5 shadow-[0_0_20px_rgba(236,72,153,0.25)]"
          >
            <img
              src={nft.image}
              alt={nft.name}
              className="w-full h-64 sm:h-80 object-contain rounded-xl mb-4"
            />
            <h3 className="text-2xl font-semibold text-fuchsia-300 mb-2">
              {nft.name}
            </h3>
            <p className="text-lg mb-1">{nft.flags}</p>
            <p className="text-sm text-purple-200 mb-6 px-2 leading-relaxed">
              {nft.desc}
            </p>

            <button
              onClick={handleClaim}
              className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-semibold py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-[0_0_15px_rgba(236,72,153,0.4)] transition"
            >
              🚀 Claim NFT
            </button>
          </motion.div>
        </AnimatePresence>

        {/* navigation arrows desktop */}
        <button
          onClick={() => setIndex((index - 1 + nfts.length) % nfts.length)}
          className="hidden sm:block absolute left-[-60px] top-1/2 -translate-y-1/2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-3 py-2 rounded-full text-lg shadow-lg"
        >
          ← Prev
        </button>
        <button
          onClick={() => setIndex((index + 1) % nfts.length)}
          className="hidden sm:block absolute right-[-60px] top-1/2 -translate-y-1/2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-3 py-2 rounded-full text-lg shadow-lg"
        >
          Next →
        </button>

        {/* mobile navigation below image */}
        <div className="sm:hidden flex justify-between mt-4">
          <button
            onClick={() => setIndex((index - 1 + nfts.length) % nfts.length)}
            className="bg-fuchsia-500 text-white px-4 py-2 rounded-full text-sm font-semibold mx-2 flex-1"
          >
            ← Prev
          </button>
          <button
            onClick={() => setIndex((index + 1) % nfts.length)}
            className="bg-fuchsia-500 text-white px-4 py-2 rounded-full text-sm font-semibold mx-2 flex-1"
          >
            Next →
          </button>
        </div>
      </div>

      <ClaimModal
        open={showModal}
        onClose={() => setShowModal(false)}
        nftName={claimedNFT ?? ''}
      />
    </div>
  )
}
