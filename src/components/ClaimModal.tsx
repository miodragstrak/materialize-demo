import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  nftName?: string
}

export function ClaimModal({ open, onClose, nftName }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md"
        >
          <motion.div
            key="modal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-[#1a0d3a] text-white rounded-3xl p-6 sm:p-8 w-[90%] sm:w-[400px] text-center border border-fuchsia-500/40 shadow-[0_0_40px_rgba(236,72,153,0.4)]"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-4 text-fuchsia-400 hover:text-fuchsia-200 text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-fuchsia-300">
              🎉 Claim Successful!
            </h2>

            <p className="text-purple-200 mb-2">
              You just claimed <b>{nftName}</b> 🐑
            </p>

            <p className="text-purple-200 mb-6 leading-relaxed text-sm sm:text-base">
              Visit our <b>DeFab partner — StarIt Center</b>, the nearest
              <b> Materialize Project</b> booth, and pick up your engraved pendant.
              <br />
              Show your wallet address to verify ownership.
            </p>

            <button
              onClick={onClose}
              className="bg-fuchsia-500 hover:bg-fuchsia-400 text-white px-6 py-2 rounded-full font-semibold transition"
            >
              Got it ✅
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
