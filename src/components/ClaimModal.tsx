'use client'

import { motion, AnimatePresence } from 'framer-motion'

type ClaimModalProps = {
  open: boolean
  onClose: () => void
  nftName: string
}

export function ClaimModal({ open, onClose, nftName }: ClaimModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#0e0524] border border-[#f5b352]/40 rounded-2xl shadow-[0_0_25px_rgba(245,179,82,0.4)] p-6 max-w-md w-[90%] text-center text-white"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <h2 className="text-2xl font-bold text-[#f5b352] mb-3">
              ✅ Claimed {nftName} NFT!
            </h2>
            <p className="text-purple-200 mb-4">
              Visit our <b>Materialize - Build Station</b> to receive your engraved pendant.
            </p>

            {/* Map Section */}
          
            <div className="rounded-xl overflow-hidden shadow-lg border border-[#f5b352]/20 mb-4">
              <iframe
                title="Materialize Start Center"
                src="mapa.png"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </div>

            <button
              onClick={onClose}
              className="bg-[#f5b352] text-[#0e0524] px-6 py-2 rounded-full font-semibold hover:bg-[#ffd168] transition"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
