import Image from "next/image";
import styles from "./ProductCard.module.css";

type Props = {
  product: {
    name: string;
    brand: string;
    basePrice: number;
    imageUrl: string;
    id: string;
  };
};

export default function ProductCard({ product }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className={styles.image}
        />
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.brandNameWrapper}>
          <p className={styles.brand}>{product.brand}</p>
          <p className={styles.name}>{product.name}</p>
        </div>
        <p className={styles.basePrice}>{product.basePrice} EUR</p>
      </div>
    </div>
  );
}
