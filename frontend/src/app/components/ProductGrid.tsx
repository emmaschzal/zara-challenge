// import components/ProductGrid.tsx
import ProductCard from "./ProductCard";
import styles from "./productGrid.module.css";

type Product = {
  id: string;
  name: string;
  brand: string;
  basePrice: number;
  imageUrl: string;
};

type Props = {
  products: Product[];
};

export default function ProductGrid({ products }: Props) {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
