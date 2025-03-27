'use client';

import { ReactNode } from "react";
import { Logo, CartInactive, CartActive } from "@/app/components/Icons/Icons";
import Link from "next/link";
import clsx from "clsx";
import { CartProvider, useCart } from "@/app/context/CartContext";
import localFont from "next/font/local";
import styles from "./styles/frontLayout.module.css";
import { usePathname } from 'next/navigation';

const helvetica = localFont({
  src: "../../../public/fonts/HelveticaNeueLight.otf",
  weight: "300",
  variable: "--font-helvetica",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

function HeaderCartIcon() {
    const { cartCount } = useCart();
    const pathname = usePathname();
  
    if (pathname === '/shop/cart') return null;
  
    return (
      <Link
        href="/shop/cart"
        className={clsx(styles.cartWrapper, {
          [styles.active]: cartCount > 0,
        })}
      >
        {cartCount > 0 ? <CartActive /> : <CartInactive />}
        <span className={styles.cartCount}>{cartCount}</span>
      </Link>
    );
  }

export default function FrontLayout({ children }: { children: ReactNode }) {
  return (
    <body className={helvetica.className}>
      <CartProvider>
        <header className={styles.header}>
          <Link href="/">
            <Logo />
          </Link>
          <HeaderCartIcon />
        </header>
        <main className={styles.pageWrapper}>{children}</main>
      </CartProvider>
    </body>
  );
}
