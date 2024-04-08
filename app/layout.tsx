import '../styles/globals.scss'
import '@mozilla/lilypad-ui/dist/styles/theme.scss'

import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'

const inter = Inter({
  variable: '--inter-font',
  subsets: ['latin'],
})

const space_grotesk = Space_Grotesk({
  variable: '--space_grotesk-font',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Grato Codes',
  description: 'A blog about technology by Nick Grato',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.variable} ${space_grotesk.variable}`}>
        <div id="LP_modal_portal"></div>

        {children}
      </body>
    </html>
  )
}
