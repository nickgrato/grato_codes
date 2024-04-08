import type { Metadata } from 'next'
import Footer from '@Modules/navigation/Footer/Footer'
import Nav from '@Modules/navigation/Nav/Nav'

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
    <main data-theme="zebra">
      <Nav />
      <div className="page_wrapper">{children}</div>
      <Footer />
    </main>
  )
}
