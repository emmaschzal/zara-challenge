import Image from "next/image";
import styles from "./ProductCard.module.css";
import type { Product } from "../types/Product";
import Link from "next/link";

type Props = {
  product: Product;
};
export default function ProductCard({ product }: Props) {
  return (
  <Link href={`/products/${product.id}`}>
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes=""
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
    </Link>
  );
}
