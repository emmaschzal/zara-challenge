'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import type { ProductFullInfo } from '@/app/types/ProductFullInfo';
import Specs from '@/app/components/Specs';
import ProductGrid from "@/app/components/ProductGrid";
import ColorOptions from "@/app/components/ColorOptions";
import StorageOptions from "@/app/components/StorageOptions";
import type { CartItem } from '@/app/types/ProductFullInfo'; 
import styles from "./page.module.css"

export default function ProductPage() {
  // product elemnts and states
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

  // handle cart.
  const handleAddToCart = () => {
    if (!product) return;
  
    const cartItem = {
      id: product.id,
      color: selectedColor || colorOptions[0]?.name,
      storage: selectedStorage || storageOptions[0]?.capacity,
      quantity: 1,
      priceAtAddTime: storageOptions.find(s => s.capacity === selectedStorage)?.price || product.basePrice
    };
  
    const cart = JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[];  


const existingIndex = cart.findIndex((item: CartItem) =>
      item.id === cartItem.id &&
      item.color === cartItem.color &&
      item.storage === cartItem.storage
    );
  
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push(cartItem);
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  

  // loading page  
  if (loading || !product) return <p></p>;

  const { storageOptions = [], colorOptions = [], similarProducts = [] } = product;
  const currentImage =
  colorOptions.find((color) => color.name === selectedColor)?.imageUrl ||
  colorOptions[0]?.imageUrl;
  const selectedStoragePrice = storageOptions.find(
    (s) => s.capacity === selectedStorage
  )?.price;




  return (
    <div className={styles.page}>
      <div className={styles.productInfoImgWrapper}>
        <div className={styles.imageWrapper}>
      <Image
        src={currentImage}
        alt={product.name}
        fill
        className={styles.image}
      />
      </div>
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
          <button className={styles.addToCart} onClick={handleAddToCart}>AÑADIR</button>
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
