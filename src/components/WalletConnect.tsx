import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import '@solana/wallet-adapter-react-ui/styles.css'

export function WalletConnect() {
  return (
    <WalletMultiButton className="!bg-fuchsia-600 hover:!bg-fuchsia-700 !text-white !font-semibold !rounded-full !px-6" />
  )
}
