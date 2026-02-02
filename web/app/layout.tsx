import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'PROTOCOL: RED',
  description: 'The First On-Chain Red Teaming Protocol. Built by Agents.',
  authors: [{ name: '@CHERN_STEPANOV', url: 'https://t.me/CHERN_STEPANOV' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
