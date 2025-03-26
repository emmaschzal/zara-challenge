'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import type { ProductFullInfo } from '@/app/types/ProductFullInfo';
import Specs from '@/app/components/Specs';
import ProductGrid from "@/app/components/ProductGrid";
import ColorOptions from "@/app/components/ColorOptions";
import StorageOptions from "@/app/components/StorageOptions";
import styles from "./page.module.css"

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductFullInfo | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/shop/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);



  if (loading || !product) return <p></p>;

  const { storageOptions = [], colorOptions = [], similarProducts = [] } = product;

  const currentImage =
  colorOptions.find((color) => color.name === selectedColor)?.imageUrl ||
  colorOptions[0]?.imageUrl;
  const selectedStoragePrice = storageOptions.find(
    (s) => s.capacity === selectedStorage
  )?.price;
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.productInfoImgWrapper}>
      <Image
        src={currentImage}
        alt={product.name}
        width={500}
        height={500}
        className={styles.image}
      />
        <div className={styles.info}>
          <div className={styles.namePrice}>
            <h1 className={styles.brandName}>{product.brand} {product.name}</h1>
            <h2 className={styles.price}>
            {selectedStoragePrice ? `${selectedStoragePrice} EUR` : `FROM ${product.basePrice} EUR`}
            </h2>
          </div>
          <div className={styles.selectors}>
            <StorageOptions
              options={storageOptions}
              selected={selectedStorage}
              onSelect={setSelectedStorage}
            />
            <ColorOptions
              colors={colorOptions}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
            />
          </div>
        </div>
      </div>

      <Specs specs={product.specs} />
      <div className={styles.similarProducts}>
      <h3 className={styles.similarItemsLabel}>Similar items</h3>
      <ProductGrid products={similarProducts} horizontal/>
      </div>
    </div>
  );
}
