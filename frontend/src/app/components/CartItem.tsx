'use client';

import Image from 'next/image';
import styles from './styles/cartItem.module.css';

interface Props {
  item: {
    id: string;
    color: string;
    storage: string;
    quantity: number;
    priceAtAddTime: number;
    imageUrl: string;
  };
  product: {
    id: string;
    name: string;
    brand: string;
    imageUrl: string;
  };
  onRemove: () => void;
}

export default function CartItem({ item, product, onRemove }: Props) {
  return (
    <div className={styles.cartItem}>
      <div className={styles.imageWrapper}>
        <Image
          src={item.imageUrl || product.imageUrl}
          alt={product.name}
          width={262}
          height={324}
          className={styles.image}
        />
      </div>
      <div className={styles.infoBlock}>
        <div className={styles.productInfo}>
          <div className={styles.nameGroup}>
            <p className={styles.brand}>{product.brand}</p>
            <p className={styles.name}>{product.name}</p>
          </div>
          <p className={styles.price}>{item.priceAtAddTime} EUR</p>
        </div>
        <button onClick={onRemove} className={styles.remove}>Eliminar</button>
      </div>
    </div>
  );
}
