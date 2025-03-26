import ProductCard from "./ProductCard";
import styles from "./styles/productGrid.module.css";

type Product = {
  id: string;
  name: string;
  brand: string;
  basePrice: number;
  imageUrl: string;
};

type Props = {
  products: Product[];
  horizontal?: boolean;
};

export default function ProductGrid({ products, horizontal = false }: Props) {
  return (
    <div className={horizontal ? styles.horizontalWrapper : styles.gridWrapper}>
      <ul className={styles.grid}>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
