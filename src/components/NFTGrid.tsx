'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useEffect, useCallback, useRef } from 'react'
import { sendClaimEmail } from '../lib/sendClaimEmail'
import { toast } from 'react-hot-toast'

type NFT = {
  id: number
  name: string
  flags: string
  description: string
  image: string
}

export function NFTGrid() {
  const { publicKey } = useWallet()
  const autoplay = useRef(Autoplay({ delay: 3500, stopOnInteraction: false }))
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [autoplay.current]
  )

  const nfts: NFT[] = [
    {
      id: 1,
      name: 'Bardoka',
      flags: '🇷🇸 🇲🇪 🇦🇱',
      description:
        'A multi-purpose breed found across Serbia, Montenegro, and Albania. Valued for milk, meat, and wool production.',
      image: '/nft1.jpg',
    },
    {
      id: 2,
      name: 'Balusha',
      flags: '🇦🇱',
      description:
        'A unique Albanian breed with snow-white wool; under conservation for its purity and resilience.',
      image: '/nft2.jpg',
    },
    {
      id: 3,
      name: 'Dubska Pramenka',
      flags: '🇧🇦 🇭🇷',
      description:
        'Hardy mountain breed known for high milk yield and adaptability; found in Bosnia and northern Croatia.',
      image: '/nft3.jpg',
    },
    {
      id: 4,
      name: 'Pivska Pramenka',
      flags: '🇲🇪 🇧🇦',
      description:
        'Local Montenegrin–Bosnian breed raised for quality meat and durable wool; part of national conservation programs.',
      image: '/nft4.jpg',
    },
    {
      id: 5,
      name: 'Sharri',
      flags: '🇲🇰 🇦🇱',
      description:
        'Multi-purpose mountain breed from the Šar Mountains, prized for its endurance and rich milk.',
      image: '/nft5.jpg',
    },
    {
      id: 6,
      name: 'Karakachan',
      flags: '🇧🇬 🇷🇸 🇲🇰',
      description:
        'One of Europe’s oldest native breeds; symbol of sustainable herding and combined production.',
      image: '/nft6.jpg',
    },
    {
      id: 7,
      name: 'Istrian',
      flags: '🇭🇷',
      description:
        'Recognized for premium lamb and cheese; native to Croatia’s Istria region.',
      image: '/nft7.jpg',
    },
    {
      id: 8,
      name: 'Pag Sheep',
      flags: '🇭🇷',
      description:
        'Famous for the world-known “Paški sir” cheese; a small island breed adapted to harsh coastal winds.',
      image: '/nft8.jpg',
    },
    {
      id: 9,
      name: 'Sjenicka Sheep',
      flags: '🇷🇸 🇲🇪',
      description:
        'A long-tailed strain of the Zeckel group; raised for high-quality milk, meat, and wool in Serbia and Montenegro.',
      image: '/nft9.jpg',
    },
    {
      id: 10,
      name: 'Native Colored Wool Breed',
      flags: '🇧🇬',
      description:
        'Bulgaria’s heritage breed with naturally colored wool, valued by local textile artisans.',
      image: '/nft10.jpg',
    },
    {
      id: 11,
      name: 'Vitoroga (Horned Sheep)',
      flags: '🇷🇸 🇲🇪 🇧🇦 🇦🇱',
      description:
        'Hardy mountain sheep known for its spiral horns and dense wool; iconic across the Western Balkans.',
      image: '/nft11.jpg',
    },
  ]

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const handleClaim = async (nft: NFT) => {
    if (!publicKey) return toast.error('⚠️ Connect your wallet first!')

    const wallet = publicKey.toBase58()
    const success = sendClaimEmail(wallet, nft.name)

    if (await success) {
      toast.success(`✅ ${nft.name} claimed!`)
      toast.custom(() => (
        <div className="text-white bg-fuchsia-600 px-4 py-2 rounded-lg shadow-lg">
          🎁 Visit our booth to receive your engraved stand!
        </div>
      ))
    } else {
      toast.error('❌ Something went wrong while saving your claim.')
    }
  }

  useEffect(() => {
    if (emblaApi) emblaApi.reInit()
  }, [emblaApi])

  return (
    <div className="relative w-screen max-w-full mx-auto mt-10 overflow-hidden">
      {/* Carousel container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6 px-4 sm:px-8">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className="flex-[0_0_95%] sm:flex-[0_0_30%] bg-[#1a0d3a]/70 rounded-2xl p-6 border border-fuchsia-600/30 shadow-lg hover:shadow-[0_0_25px_rgba(236,72,153,0.3)] transition-all flex flex-col items-center text-center"
            >
              <div className="w-32 h-32 sm:w-48 sm:h-48 flex items-center justify-center bg-[#0e0524]/80 rounded-xl overflow-hidden mb-4">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="object-contain w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-fuchsia-300 mb-1">
                {nft.name}
              </h3>
              <p className="text-xl mb-2">{nft.flags}</p>
              <p className="text-sm text-purple-200 mb-4">{nft.description}</p>
              <button
                onClick={() => handleClaim(nft)}
                className="bg-fuchsia-500 text-white px-6 py-2 rounded-full font-medium hover:bg-fuchsia-400 transition"
              >
                Claim
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={scrollPrev}
          className="bg-fuchsia-600/50 hover:bg-fuchsia-600 text-white px-4 py-2 rounded-full"
        >
          ← Prev
        </button>
        <button
          onClick={scrollNext}
          className="bg-fuchsia-600/50 hover:bg-fuchsia-600 text-white px-4 py-2 rounded-full"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
