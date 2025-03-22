'use client';

import { useEffect, useState } from 'react';
import ProductGrid from './components/ProductGrid';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('http://localhost:5000/');
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return <ProductGrid products={products} />;
}
