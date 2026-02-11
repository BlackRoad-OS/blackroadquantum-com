import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'blackroadquantum.com | BlackRoad OS',
  description: 'BlackRoad Quantum Computing Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif',
        background: '#000',
        color: '#fff',
        minHeight: '100vh',
      }}>
        {children}
      </body>
    </html>
  )
}
