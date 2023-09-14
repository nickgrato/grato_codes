import '../styles/globals.scss';
import '@mozilla/lilypad-ui/dist/styles/theme.scss';

import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import Footer from '@Modules/navigation/Footer/Footer';
import Nav from '@Modules/navigation/Nav/Nav';

const inter = Inter({
  variable: '--inter-font',
  subsets: ['latin'],
});

const space_grotesk = Space_Grotesk({
  variable: '--space_grotesk-font',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Grato Codes',
  description: 'A blog about technology by Nick Grato',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* TODO */}
        {/* <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        /> */}
      </head>
      <body>
        <main
          className={`${inter.variable} ${space_grotesk.variable}`}
          data-theme="zebra"
        >
          <Nav />
          <div className="page_wrapper">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
