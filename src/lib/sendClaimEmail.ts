import emailjs from 'emailjs-com'

const SERVICE_ID = 'service_vvvcs08'      // 🔁 replace with your own
const TEMPLATE_ID = 'template_vrr2a0y'   // 🔁 replace with your own
const PUBLIC_KEY = '5gENGd4cXWssa5Z8p'   // 🔁 replace with your own

export async function sendClaimEmail(wallet: string, nftName: string): Promise<boolean> {
  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        wallet,
        nftName,
        timestamp: new Date().toLocaleString(),
      },
      PUBLIC_KEY
    )
    console.log('✅ Email sent:', response.status)
    return true
  } catch (error) {
    console.error('❌ Error sending claim email:', error)
    return false
  }
}