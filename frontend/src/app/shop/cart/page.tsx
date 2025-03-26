'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

interface CartItem {
  id: string;
  color: string;
  storage: string;
  quantity: number;
  priceAtAddTime: number;
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
            <div key={i} className={styles.cartItem}>
              <div className={styles.imageWrapper}>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={200}
                  height={200}
                  className={styles.image}
                />
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{product.brand} {product.name}</h3>
                <p className={styles.details}>
                  {item.storage} | {item.color.toUpperCase()}
                </p>
                <p className={styles.price}>{item.priceAtAddTime} EUR</p>
                <p className={styles.quantity}>Qty: {item.quantity}</p>
                <button onClick={() => handleRemove(i)} className={styles.remove}>Eliminar</button>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.cartFooter}>
        <Link href="/">
          <button className={styles.continue}>CONTINUE SHOPPING</button>
        </Link>
        <div className={styles.totalPay}>
          <p className={styles.total}>TOTAL: {total} EUR</p>
          <button className={styles.pay}>PAY</button>
        </div>
      </div>
    </div>
  );
}
