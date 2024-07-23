'use client';
import { Nunito_Sans } from 'next/font/google';

const nunito = Nunito_Sans({
  subsets: ['latin', 'cyrillic-ext', 'latin-ext', 'vietnamese'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-Nunito_Sans',
});

export default function GlobalFont() {
  return (
    <style jsx global>
      {`
        :root {
          --font-Nunito_Sans: ${nunito.style.fontFamily};
        }
      `}
    </style>
  );
}
