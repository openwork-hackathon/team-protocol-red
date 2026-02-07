import './globals.css'
import type { Metadata } from 'next'
import { Web3Provider } from './Web3Provider'

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
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  )
}
