import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWallet } from '@solana/wallet-adapter-react'
import { sendClaimEmail } from '../lib/sendClaimEmail'
import { ClaimModal } from './ClaimModal'

const nfts = [
  { id: 1, name: 'Vitoroga (Horned Sheep)', image: '/nft1.jpg', flags: '🇷🇸 🇲🇪 🇧🇦 🇦🇱',
    desc: 'Hardy mountain sheep known for its spiral horns and dense wool; iconic across the Western Balkans.' },
  { id: 2, name: 'Balusha', image: '/nft2.jpg', flags: '🇦🇱',
    desc: 'A unique Albanian breed with snow-white wool; under conservation for its purity and resilience.' },
  { id: 3, name: 'Balusha', image: '/nft3.jpg', flags: '🇦🇱',
    desc: 'A unique Albanian breed with snow-white wool; under conservation for its purity and resilience.' },
  { id: 4, name: 'Istrian Sheep', image: '/nft4.jpg', flags: '🇭🇷 🇸🇮',
    desc: 'A small, hardy breed from the Istrian peninsula, valued for its milk and meat.' },
  { id: 5, name: 'Istrian Sheep', image: '/nft5.jpg', flags: '🇭🇷 🇸🇮',
    desc: 'A small, hardy breed from the Istrian peninsula, valued for its milk and meat.' },
  { id: 6, name: 'Vitoroga (Horned Sheep)', image: '/nft6.jpg', flags: '🇷🇸 🇲🇪 🇧🇦 🇦🇱',
    desc: 'Hardy mountain sheep known for its spiral horns and dense wool; iconic across the Western Balkans.'},
  { id: 7, name: 'Dubska Pramenka', image: '/nft7.jpg', flags: '🇧🇦 🇭🇷',
    desc: 'A hardy mountain breed known for high milk yield and adaptability; found in Bosnia and northern Croatia.' },
  { id: 8, name: 'Balusha', image: '/nft8.jpg', flags: '🇦🇱',
    desc: 'A unique Albanian breed with snow-white wool; under conservation for its purity and resilience.' },
  { id: 9, name: 'Dubska Pramenka', image: '/nft9.jpg', flags: '🇧🇦 🇭🇷',
    desc: 'A hardy mountain breed known for high milk yield and adaptability; found in Bosnia and northern Croatia.' },
  { id: 10, name: 'Karakachan', image: '/nft10.jpg', flags: '🇧🇬 🇷🇸 🇲🇰',
    desc: 'One of Europe’s oldest native breeds; symbol of sustainable herding and combined production.' },
  { id: 11, name: 'Karakachan', image: '/nft11.jpg', flags: '🇧🇬 🇷🇸 🇲🇰',
    desc: 'One of Europe’s oldest native breeds; symbol of sustainable herding and combined production.' },
  { id: 12, name: 'Native Colored Wool Breed', image: '/nft12.jpg', flags: '🇧🇬',
    desc: 'Bulgaria’s heritage breed with naturally colored wool, valued by local textile artisans.' },
  { id: 13, name: 'Native Colored Wool Breed', image: '/nft13.jpg', flags: '🇧🇬',
    desc: 'Bulgaria’s heritage breed with naturally colored wool, valued by local textile artisans.' },
  { id: 14, name: 'Native Colored Wool Breed', image: '/nft14.jpg', flags: '🇧🇬',
    desc: 'Bulgaria’s heritage breed with naturally colored wool, valued by local textile artisans.' },
  { id: 15, name: 'Native Colored Wool Breed', image: '/nft15.jpg', flags: '🇧🇬',
    desc: 'Bulgaria’s heritage breed with naturally colored wool, valued by local textile artisans.' },
  { id: 16, name: 'Native Colored Wool Breed', image: '/nft16.jpg', flags: '🇧🇬',
    desc: 'Bulgaria’s heritage breed with naturally colored wool, valued by local textile artisans.' },
  { id: 17, name: 'Native Colored Wool Breed', image: '/nft17.jpg', flags: '🇧🇬',
    desc: 'Bulgaria’s heritage breed with naturally colored wool, valued by local textile artisans.' },
  { id: 18, name: 'Native Colored Wool Breed', image: '/nft18.jpg', flags: '🇧🇬',
    desc: 'Bulgaria’s heritage breed with naturally colored wool, valued by local textile artisans.' },
  { id: 19, name: 'Bovec', image: '/nft19.jpg', flags: '🇸🇮',
    desc: 'The Bovec sheep, known locally as “Bovška ovca" or “trentarka" in the Trenta Valley, originated in the northwestern part of Slovenia.' },
    { id: 20, name: 'Arta', image: '/nft20.jpg', flags: '🇬🇷',
    desc: 'The Greek Arta (also known as Frisarta) sheep breed is a dairy breed, developed for higher milk production.' },
    { id: 21, name: 'Sharri - Sharmountain sheep', image: '/nft21.jpg', flags: '🇲🇰 🇦🇱',
    desc: 'Multi-purpose mountain breed from the Šar Mountains, prized for its endurance and rich milk.' },
    { id: 22, name: 'Sharri - Sharmountain sheep', image: '/nft22.jpg', fflags: '🇲🇰 🇦🇱',
    desc: 'Multi-purpose mountain breed from the Šar Mountains, prized for its endurance and rich milk.' },
    { id: 23, name: 'Karakachan', image: '/nft23.jpg', flags: '🇧🇬 🇷🇸 🇲🇰',
    desc: 'One of Europe’s oldest native breeds; symbol of sustainable herding and combined production.' },
    { id: 24, name: 'Tsigai', image: '/nft24.jpg', flags: '🇷🇴',
    desc: 'Tsigai sheep in Romania is a multipurpose breed, historically used for milk, meat, and wool.' },
    { id: 25, name: 'Dubska Pramenka', image: '/nft25.jpg', flags: '🇧🇦 🇭🇷',
    desc: 'A hardy mountain breed known for high milk yield and adaptability; found in Bosnia and northern Croatia.' },
    { id: 26, name: 'Pag Sheep', image: '/nft26.jpg', flags: '🇭🇷',
    desc: 'Famous for the world-known “Paški sir” cheese; a small island breed adapted to harsh coastal winds.' },
    { id: 27, name: 'Bardoka', image: '/nft27.jpg', flags: '🇷🇸 🇲🇪 🇦🇱',
    desc: 'A multi-purpose breed found across Serbia, Montenegro, and Albania. Valued for milk, meat, and wool production.' },
    { id: 28, name: 'Svrljig Sheep', image: '/nft28.jpg', flags: '🇷🇸',
    desc: 'The Svrljig sheep is a long-tailed, native Serbian sheep breed from the Svrljig region in eastern Serbia.' },
    { id: 29, name: 'Bardoka', image: '/nft29.jpg', flags: '🇷🇸 🇲🇪 🇦🇱',
    desc: 'A multi-purpose breed found across Serbia, Montenegro, and Albania. Valued for milk, meat, and wool production.' },
    { id: 30, name: 'Sharri - Sharmountain sheep', image: '/nft30.jpg', flags: '🇲🇰 🇦🇱',
    desc: 'Multi-purpose mountain breed from the Šar Mountains, prized for its endurance and rich milk.' },
    { id: 31, name: 'Sharri - Sharmountain sheep', image: '/nft31.jpg', flags: '🇲🇰 🇦🇱',
    desc: 'Multi-purpose mountain breed from the Šar Mountains, prized for its endurance and rich milk.' },
    { id: 32, name: 'Sharri - Sharmountain sheep', image: '/nft32.jpg', flags: '🇲🇰 🇦🇱',
    desc: 'Multi-purpose mountain breed from the Šar Mountains, prized for its endurance and rich milk.' },
    { id: 33, name: 'Sharri - Sharmountain sheep', image: '/nft33.jpg', flags: '🇲🇰 🇦🇱',
    desc: 'Multi-purpose mountain breed from the Šar Mountains, prized for its endurance and rich milk.' },
    { id: 34, name: 'Sjenicka Sheep', image: '/nft34.jpg', flags: '🇷🇸 🇲🇪',
    desc: 'A long-tailed strain of the Zeckel group; raised for high-quality milk, meat, and wool in Serbia and Montenegro.' },
    { id: 35, name: 'Pivska Pramenka', image: '/nft35.jpg', flags: '🇲🇪 🇧🇦',
    desc: 'Local Montenegrin–Bosnian breed raised for quality meat and durable wool; part of national conservation programs.' },
    { id: 36, name: 'Sharri - Sharmountain sheep', image: '/nft36.jpg', flags: '🇲🇰 🇦🇱',
    desc: 'Multi-purpose mountain breed from the Šar Mountains, prized for its endurance and rich milk.' },
    { id: 37, name: 'Pivska Pramenka', image: '/nft37.jpg', flags: '🇲🇪 🇧🇦',
    desc: 'Local Montenegrin–Bosnian breed raised for quality meat and durable wool; part of national conservation programs.' },
    { id: 38, name: 'Pivska Pramenka', image: '/nft38.jpg', flags: '🇲🇪 🇧🇦',
    desc: 'Local Montenegrin–Bosnian breed raised for quality meat and durable wool; part of national conservation programs.' },
    { id: 39, name: 'Sjenica sheep', image: '/nft39.jpg', flags: '🇷🇸 🇧🇦 🇲🇪',
    desc: 'This breed, common in Serbia, Bosnia and Herzegovina, and Montenegro, is a triple-purpose breed valued for its meat, milk, and wool. ' },
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
            className="rounded-3xl bg-[#15092f] border border-[#f5b352]/40 p-8 shadow-[0_0_25px_rgba(245,179,82,0.3)] flex flex-col items-center"
          >
            {/* IMAGE BOX */}
            <div className="w-[260px] sm:w-[300px] aspect-[4/3] overflow-hidden rounded-2xl mb-4 flex items-center justify-center bg-[#0e0524] border border-[#f5b352]/30 shadow-[0_0_15px_rgba(245,179,82,0.3)]">
              <img
                src={nft.image}
                alt={nft.name}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* NAME + FLAGS INLINE */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-[#f5b352] drop-shadow-[0_0_10px_rgba(245,179,82,0.5)]">
              {nft.name}
            </h2>
            <p className="text-xl mb-2">{nft.flags}</p>
            <p className="text-base sm:text-lg text-purple-200 mb-4 leading-relaxed">{nft.desc}</p>

            {/* CLAIM BUTTON */}
            <button
              onClick={handleClaim}
              className="w-full font-semibold py-4 rounded-full text-lg transition-transform hover:scale-105"
              style={{
                border: '2px solid #f5b352',
                color: '#f5b352',
                background: 'rgba(14, 5, 36, 0.85)',
                padding: '14px 36px',
                borderRadius: 9999,
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: '0.5px',
                boxShadow: '0 0 15px rgba(245,179,82,0.4)',
                transition: 'all 0.3s ease',
                animation: 'glowPulse 2s infinite ease-in-out',
              }}
            >
              🚀 Claim NFT
            </button>
          </motion.div>
        </AnimatePresence>

        {/* navigation arrows desktop */}
        <button
          onClick={() => setIndex((index - 1 + nfts.length) % nfts.length)}
          className="hidden sm:block absolute left-[-80px] top-1/2 -translate-y-1/2 transition-transform hover:scale-110"
          style={{
            border: '2px solid #f5b352',
            color: '#f5b352',
            background: 'rgba(14, 5, 36, 0.6)',
            padding: '10px 20px',
            borderRadius: 9999,
            fontWeight: 600,
            fontSize: 18,
            boxShadow: '0 0 15px rgba(245,179,82,0.4)',
            transition: 'all 0.3s ease',
          }}
        >
          ← Prev
        </button>

        <button
          onClick={() => setIndex((index + 1) % nfts.length)}
          className="hidden sm:block absolute right-[-80px] top-1/2 -translate-y-1/2 transition-transform hover:scale-110"
          style={{
            border: '2px solid #f5b352',
            color: '#f5b352',
            background: 'rgba(14, 5, 36, 0.6)',
            padding: '10px 20px',
            borderRadius: 9999,
            fontWeight: 600,
            fontSize: 18,
            boxShadow: '0 0 15px rgba(245,179,82,0.4)',
            transition: 'all 0.3s ease',
          }}
        >
          Next →
        </button>

        {/* mobile navigation below image */}
        <div className="sm:hidden flex justify-between mt-6 w-full">
          <button
            onClick={() => setIndex((index - 1 + nfts.length) % nfts.length)}
            style={{
              border: '2px solid #f5b352',
              color: '#f5b352',
              background: 'rgba(14, 5, 36, 0.8)',
              padding: '12px 0',
              borderRadius: 30,
              fontWeight: 600,
              flex: 1,
              margin: '0 8px',
              fontSize: 16,
              boxShadow: '0 0 15px rgba(245,179,82,0.4)',
              transition: 'all 0.3s ease',
            }}
          >
            ← Prev
          </button>

          <button
            onClick={() => setIndex((index + 1) % nfts.length)}
            style={{
              border: '2px solid #f5b352',
              color: '#f5b352',
              background: 'rgba(14, 5, 36, 0.8)',
              padding: '12px 0',
              borderRadius: 30,
              fontWeight: 600,
              flex: 1,
              margin: '0 8px',
              fontSize: 16,
              boxShadow: '0 0 15px rgba(245,179,82,0.4)',
              transition: 'all 0.3s ease',
            }}
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
