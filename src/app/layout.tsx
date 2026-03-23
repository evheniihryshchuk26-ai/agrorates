import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const GA_ID = 'G-96119180P2';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://agrorates.com'),
  title: {
    default: 'AgroRates — Free Agricultural Calculators for Farmers',
    template: '%s | AgroRates',
  },
  description:
    'Free farming calculators for fertilizer rates, seed rates, crop yields, livestock, and more. Plan smarter, farm better.',
  openGraph: {
    title: 'AgroRates — Free Agricultural Calculators for Farmers',
    description:
      'Free farming calculators for fertilizer rates, seed rates, crop yields, livestock, and more. 184 tools to plan smarter and farm better.',
    url: 'https://agrorates.com',
    siteName: 'AgroRates',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'AgroRates — Free Agricultural Calculators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgroRates — Free Agricultural Calculators for Farmers',
    description:
      'Free farming calculators for fertilizer rates, seed rates, crop yields, livestock, and more.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
