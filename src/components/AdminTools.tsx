'use client'

export function AdminTools() {
  return (
    <div className="bg-[#1a0d3a] border border-fuchsia-600/30 rounded-2xl p-8 text-center mt-12">
      <h2 className="text-2xl font-semibold text-fuchsia-300 mb-4">Admin Console</h2>
      <p className="text-purple-300">
        Your claims are automatically emailed to you via EmailJS.
        <br />
        <span className="text-sm text-purple-400">Check your inbox for real-time records.</span>
      </p>
    </div>
  )
}
