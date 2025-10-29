import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWallet } from '@solana/wallet-adapter-react'
import { sendClaimEmail } from '../lib/sendClaimEmail'

const nfts = [
  { id: 1, name: 'Vitoroga (Horned Sheep)', image: '/nft1.jpg', flags: '🇷🇸 🇲🇪 🇧🇦 🇦🇱',
    desc: 'Hardy mountain sheep known for its spiral horns and dense wool, iconic across the Western Balkans.' },
  { id: 2, name: 'Balusha', image: '/nft2.jpg', flags: '🇦🇱',
    desc: 'A unique Albanian breed with snow-white wool, under conservation for its purity and resilience.' },
  { id: 3, name: 'Balusha', image: '/nft3.jpg', flags: '🇦🇱',
    desc: 'A unique Albanian breed with snow-white wool, under conservation for its purity and resilience.' },
  { id: 4, name: 'Istrian Sheep', image: '/nft4.jpg', flags: '🇭🇷 🇸🇮',
    desc: 'A small, hardy breed from the Istrian peninsula, valued for its milk and meat.' },
  { id: 5, name: 'Istrian Sheep', image: '/nft5.jpg', flags: '🇭🇷 🇸🇮',
    desc: 'A small, hardy breed from the Istrian peninsula, valued for its milk and meat.' },
  { id: 6, name: 'Vitoroga (Horned Sheep)', image: '/nft6.jpg', flags: '🇷🇸 🇲🇪 🇧🇦 🇦🇱',
    desc: 'Hardy mountain sheep known for its spiral horns and dense wool, iconic across the Western Balkans.'},
  { id: 7, name: 'Dubska Pramenka', image: '/nft7.jpg', flags: '🇧🇦 🇭🇷',
    desc: 'A hardy mountain breed known for high milk yield and adaptability, found in Bosnia and northern Croatia.' },
  { id: 8, name: 'Balusha', image: '/nft8.jpg', flags: '🇦🇱',
    desc: 'A unique Albanian breed with snow-white wool, under conservation for its purity and resilience.' },
  { id: 9, name: 'Dubska Pramenka', image: '/nft9.jpg', flags: '🇧🇦 🇭🇷',
    desc: 'A hardy mountain breed known for high milk yield and adaptability, found in Bosnia and northern Croatia.' },
  { id: 10, name: 'Karakachan', image: '/nft10.jpg', flags: '🇧🇬 🇷🇸 🇲🇰',
    desc: 'One of Europe’s oldest native breeds, symbol of sustainable herding and combined production.' },
  { id: 11, name: 'Karakachan', image: '/nft11.jpg', flags: '🇧🇬 🇷🇸 🇲🇰',
    desc: 'One of Europe’s oldest native breeds, symbol of sustainable herding and combined production.' },
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
    desc: 'One of Europe’s oldest native breeds, symbol of sustainable herding and combined production.' },
    { id: 24, name: 'Tsigai', image: '/nft24.jpg', flags: '🇷🇴',
    desc: 'Tsigai sheep in Romania is a multipurpose breed, historically used for milk, meat, and wool.' },
    { id: 25, name: 'Dubska Pramenka', image: '/nft25.jpg', flags: '🇧🇦 🇭🇷',
    desc: 'A hardy mountain breed known for high milk yield and adaptability, found in Bosnia and northern Croatia.' },
    { id: 26, name: 'Pag Sheep', image: '/nft26.jpg', flags: '🇭🇷',
    desc: 'Famous for the world-known “Paški sir” cheese, a small island breed adapted to harsh coastal winds.' },
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
    desc: 'A long-tailed strain of the Zeckel group, raised for high-quality milk, meat, and wool in Serbia and Montenegro.' },
    { id: 35, name: 'Pivska Pramenka', image: '/nft35.jpg', flags: '🇲🇪 🇧🇦',
    desc: 'Local Montenegrin–Bosnian breed raised for quality meat and durable wool, part of national conservation programs.' },
    { id: 36, name: 'Sharri - Sharmountain sheep', image: '/nft36.jpg', flags: '🇲🇰 🇦🇱',
    desc: 'Multi-purpose mountain breed from the Šar Mountains, prized for its endurance and rich milk.' },
    { id: 37, name: 'Pivska Pramenka', image: '/nft37.jpg', flags: '🇲🇪 🇧🇦',
    desc: 'Local Montenegrin–Bosnian breed raised for quality meat and durable wool, part of national conservation programs.' },
    { id: 38, name: 'Pivska Pramenka', image: '/nft38.jpg', flags: '🇲🇪 🇧🇦',
    desc: 'Local Montenegrin–Bosnian breed raised for quality meat and durable wool, part of national conservation programs.' },
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

  const nft = nfts[index]

  const handleClaim = async () => {
    if (!publicKey) return toast.error('⚠️ Connect wallet first!')
    const wallet = publicKey.toBase58()
    const ok = await sendClaimEmail(wallet, nft.name)
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    ok ? toast.success(`Claimed ${nft.name}`) : toast.error('❌ Error sending claim')
  }

  return (
    <div className="relative flex flex-col items-center mt-10 mb-16">
      <AnimatePresence mode="wait">
        <motion.div
          key={nft.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="bg-[#15092f] border border-accent/40 rounded-2xl p-5 shadow-[0_0_20px_rgba(245,179,82,0.3)] max-w-sm sm:max-w-md text-center"
        >

          <h3 className="text-2xl font-semibold text-accent mb-2">{nft.name}</h3>
          <p className="text-lg mb-2">{nft.flags}</p>
          <p className="text-sm text-purple-200 mb-4">{nft.desc}</p>

          <img
            src={nft.image}
            alt={nft.name}
            className="w-full h-[220px] object-cover rounded-xl mb-4"
          />

          <button
            onClick={handleClaim}
            className="w-full border-2 border-accent text-accent py-3 rounded-full font-semibold text-lg transition hover:bg-accent hover:text-brand"
          >
            🚀 Claim NFT
          </button>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between w-full max-w-xs mt-4">
        <button
          onClick={() => setIndex((index - 1 + nfts.length) % nfts.length)}
          className="border-2 border-accent text-accent px-4 py-2 rounded-full font-semibold hover:bg-accent hover:text-brand"
        >
          ← Prev
        </button>
        <button
          onClick={() => setIndex((index + 1) % nfts.length)}
          className="border-2 border-accent text-accent px-4 py-2 rounded-full font-semibold hover:bg-accent hover:text-brand"
        >
          Next →
        </button>
      </div>
    </div>
  )
}