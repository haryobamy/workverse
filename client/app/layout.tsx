/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import type { Metadata } from 'next';
import './globals.css';
import AppProviders from '@/providers';
import GlobalFont from '@/providers/GlobalFont';
import { appUrl } from '@/lib/env';
import { PropsWithChildren } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Protected from '@/hooks/useProtected';

export const metadata: Metadata = {
  //metadataBase: new URL(appUrl),
  title: 'Workverse Todo',
  description: 'Generated by ',
  icons: {},
  keywords: [],
  openGraph: {
    title: '',
    description: '',
    siteName: 'Workverse Todo',
    images: [],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <GlobalFont />
        <AppProviders>
          <Header />
          {children}
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
