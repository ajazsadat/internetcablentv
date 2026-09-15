import { Bricolage_Grotesque, Manrope } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SiteDisclaimer from '@/components/SiteDisclaimer';
import { SITE } from '@/lib/site';

const display = Bricolage_Grotesque({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
});

const body = Manrope({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  title: {
    default: `${SITE.brandFull} | Compare Internet, TV & Bundle Plans`,
    template: `%s | ${SITE.brandFull}`,
  },
  description: `${SITE.operatedByLabel} is an independent reseller helping households compare internet, fiber, wireless, and TV bundle options. Call ${SITE.phoneDisplay}.`,
  authors: [{ name: SITE.legalName }],
  keywords: [
    'internet cable n tv',
    'compare internet plans',
    'internet and TV bundles',
    'Spectrum plans',
    'Xfinity plans',
    'fiber internet',
  ],
  openGraph: {
    title: `${SITE.brandFull} | Compare Internet, TV & Bundle Plans`,
    description: `Compare internet and TV plans available at your address with ${SITE.brandFull}.`,
    url: `https://${SITE.domain}`,
    siteName: SITE.brandFull,
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/assets/icons/favicon.ico', sizes: 'any' },
      { url: '/assets/icons/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/assets/icons/favicon-48.png', type: 'image/png', sizes: '48x48' },
    ],
    apple: '/assets/icons/apple-touch-icon.png',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        {/* Reveal animations start hidden and are flipped by IntersectionObserver,
            so without scripting the content must be forced visible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <SiteDisclaimer />
        <Footer />
      </body>
    </html>
  );
}
