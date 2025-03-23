import './styles/globals.css';
import styles from './styles/layout.module.css';
import { ReactNode } from 'react';
import { Logo } from '@/app/components/Icons/Icons';
import { CartInactive } from '@/app/components/Icons/Icons'; 
import localFont from 'next/font/local';

const helvetica = localFont({
  src:'../../public/fonts/HelveticaNeueLight.otf',
  weight: '300',
  variable: '--font-helvetica',
  display: 'swap',
  fallback: ['Arial', 'sans-serif']

});

export const metadata = {
  title: 'ZARA Challenge',
  description: 'Frontend challenge for Napptilus',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={helvetica.className}>
        <header className={styles.header}>
          <Logo />
          <CartInactive />
        </header>
        <main className={styles.pageWrapper}>{children}</main>
      </body>
    </html>
  );
}
