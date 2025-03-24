'use client';
import { useEffect, useState, useCallback } from 'react';
import ProductGrid from './components/ProductGrid';
import SearchBar from './components/SearchBar';
import styles from './page.module.css'
import type { Product } from './types/Product';


export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const handleResults = useCallback((results: Product[]) => {
    setProducts(results);
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      const res = await fetch('http://localhost:5000/shop');
      const data = await res.json();
      setProducts(data);
    };
    fetchAll();
  }, []);

  return (
    <div className={styles.page}>
      <SearchBar onResults={handleResults} />
      <ProductGrid products={products} />
    </div>
  );
}
