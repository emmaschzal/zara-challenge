'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import CartItem from '@/app/components/CartItem'; 
import { useCart } from '@/app/context/CartContext';


interface CartItem {
  id: string;
  color: string;
  storage: string;
  quantity: number;
  priceAtAddTime: number;
  imageUrl: string;
}

interface ColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}

interface ProductData {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);
  const { updateCartCount } = useCart();

  useEffect(() => {
    const items: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);

    const fetchProducts = async () => {
      const result: ProductData[] = [];

      for (const item of items) {
        try {
          const res = await fetch(`http://localhost:5000/shop/${item.id}`);
          const data = await res.json();

          const colorOptions: ColorOption[] = data.colorOptions;
          const imageUrl =
            colorOptions.find((c) => c.name === item.color)?.imageUrl ||
            colorOptions[0]?.imageUrl;

          result.push({
            id: data.id,
            name: data.name,
            brand: data.brand,
            imageUrl
          });
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }

      setProducts(result);
    };

    if (items.length > 0) {
      fetchProducts();
    }
  }, []);

  const handleRemove = (indexToRemove: number) => {
    const updated = cartItems.filter((_, i) => i !== indexToRemove);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    updateCartCount()
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.priceAtAddTime * item.quantity,
    0
  );

  return (

      <div className={styles.page}>
        <h2 className={styles.cartTitle}>CART ({cartItems.length})</h2>
    
        <div className={styles.cartWrapper}>
          {cartItems.map((item, i) => {
            const product = products.find(p => p.id === item.id);
            if (!product) return null;
    
            return (
              <div key={i + "item"} className={styles.cartItem}>
              <CartItem
                key={i}
                item={item}
                product={product}
                onRemove={() => handleRemove(i)}
              />
                </div>
            );
          
          })}
        </div>
    
        <footer className={styles.footer}>
        <footer className={styles.footer}>
  <div className={styles.footerContent}>
    {cartItems.length > 0 && (
      <div className={styles.totalActionGroup}>
        <div className={styles.totalBlock}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalAmount}>{total} EUR</span>
        </div>

        <div className={styles.buttonRow}>
          <Link href="/" className={styles.continueShopping}>
            <span className={styles.buttonLabel}>Continue shopping</span>
          </Link>

          <button className={styles.payButton}>
            <span className={styles.buttonLabel}>Pay</span>
          </button>
        </div>
      </div>
    )}
  </div>
</footer>


        </footer>
      </div>
    );

}
