import './styles/globals.css';
import styles from './styles/layout.module.css'; // optional for header styling
import { ReactNode } from 'react';
import { Logo } from '@/app/components/Icons/Icons'; // if you have a custom logo
import { CartInactive } from '@/app/components/Icons/Icons'; // example icon

export const metadata = {
  title: 'ZARA Challenge',
  description: 'Frontend challenge for ZARA',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className={styles.header}>
          <Logo />
          <CartInactive />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
