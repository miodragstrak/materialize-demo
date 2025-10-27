'use client'
import { useState } from 'react'

type Order = {
  Time: string
  Wallet: string
  NFT: string
  GCode: string
  Printed_Verified: string
}

export default function AdminPage() {
  const [order, setOrder] = useState<Order | null>(null)

  const fakeOrder: Order = {
    Time: '2025-10-27 10:45:00',
    Wallet: '2cXCryBXWRbU7g7NzJoHTLkVFySKWoQ2TkvXXSgfusK9',
    NFT: 'Bardoka',
    GCode: 'https://drive.google.com/file/d/1hM_L47oT6nMWKYYtFoSQny5RGIJms4gx/view?usp=drive_link',
    Printed_Verified: '❌ Pending',
  }

  function getNextOrder() {
    setOrder(fakeOrder)
  }

  function markVerified() {
    if (!order) return
    alert(`✅ ${order.NFT} verified and produced!`)
    setOrder({ ...order, Printed_Verified: '✅ Produced' })
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#0e0524',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 20px',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: 20, color: '#cf4968' }}>
        🧾 Materialize Admin Console
      </h1>

      {!order ? (
        <button
          onClick={getNextOrder}
          style={{
            background: '#f5b352',
            border: 'none',
            color: '#0e0524',
            padding: '14px 36px',
            borderRadius: 10,
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: 18,
            boxShadow: '0 0 20px #cf496860',
          }}
        >
          🔄 Get Next Job
        </button>
      ) : (
        <div
          style={{
            background: '#1a0d3a',
            padding: '30px',
            borderRadius: 16,
            maxWidth: 420,
            width: '100%',
            border: '1px solid #cf496850',
            boxShadow: '0 0 25px #cf496860',
            marginTop: 20,
          }}
        >
          <p><b>🕒 Time:</b> {order.Time}</p>
          <p><b>👛 Wallet:</b> {order.Wallet}</p>
          <p><b>🎨 NFT:</b> {order.NFT}</p>
          <p><b>🧬 G-Code:</b> {order.GCode}</p>
          <p><b>📦 Status:</b> {order.Printed_Verified}</p>

          <div style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button
              onClick={markVerified}
              style={{
                background: '#cf4968',
                border: 'none',
                color: '#fff',
                padding: '12px 28px',
                fontSize: 16,
                fontWeight: 700,
                borderRadius: 10,
                cursor: 'pointer',
              }}
            >
              ✅ Mark as Produced / Verified
            </button>

            <a
              href="/"
              style={{
                background: 'transparent',
                color: '#f5b352',
                border: '1px solid #f5b352',
                padding: '12px 28px',
                borderRadius: 10,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              ← Back
            </a>
          </div>
        </div>
      )}
    </main>
  )
}
