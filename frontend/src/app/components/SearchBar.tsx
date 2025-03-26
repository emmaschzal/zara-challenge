'use client';

import { useState, useEffect, ChangeEvent } from "react";
import useDebounce from "../hooks/useDebounce";
import styles from "./styles/searchBar.module.css";
import type { Product } from "../types/Product"; 

type Props = {
  onResults: (data: Product[]) => void;
};
export default function SearchBar({ onResults }: Props) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [count, setCount] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`http://localhost:5000/shop?q=${debouncedQuery}`);
      const data = await res.json();
      setCount(data.length);
      onResults(data); 
    };

    fetchProducts();
  }, [debouncedQuery]);

  return (
    <div className={styles.searchBarWrapper}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for a smartphone..."
        className={styles.input}
      />
      <p className={styles.count}>{count} RESULTS</p>
    </div>
  );
}