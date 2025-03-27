import Image from "next/image";
import styles from "./styles/productCard.module.css";
import type { Product } from "../types/Product";
import Link from "next/link";

type Props = {
  product: Product;
  priority?: boolean;
};
export default function ProductCard({ product, priority = false }: Props) {
  return (
    <Link href={`/shop/${product.id}`}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 934px) 50vw, 20vw"
            className={styles.image}
            priority={priority}
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
