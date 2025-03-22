import Image from 'next/image';
import styles from './ProductCard.module.css';

type Props = {
  name: string;
  brand: string;
  basePrice: number;
  imageUrl: string;
};

export default function ProductCard({ name, brand, basePrice, imageUrl }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={name}
          fill
          className={styles.image}
        />
      </div>
      <p className={styles.brand}>{brand.toUpperCase()}</p>
      <p className={styles.name}>{name}</p>
      <p className={styles.price}>{basePrice} EUR</p>
    </div>
  );
}
