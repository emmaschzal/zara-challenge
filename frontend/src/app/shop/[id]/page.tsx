"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import type { ProductFullInfo } from "@/app/types/ProductFullInfo";
import Specs from "@/app/components/Specs";
import ProductGrid from "@/app/components/ProductGrid";
import ColorOptions from "@/app/components/ColorOptions";
import StorageOptions from "@/app/components/StorageOptions";
import type { CartItem } from "@/app/types/ProductFullInfo";
import styles from "./page.module.css";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import { LeftArrow } from "@/app/components/Icons/Icons";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductFullInfo | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [currentImage, setCurrentImage] = useState<string>("");
  const [previousImage, setPreviousImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { updateCartCount } = useCart();

  // get single product
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/shop/${id}`);
        const data = await res.json();
        setProduct(data);

        const defaultColor = data.colorOptions?.[0]?.name || "";
        const defaultImage = data.colorOptions?.[0]?.imageUrl || "";
        setSelectedColor(defaultColor);
        setCurrentImage(defaultImage);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // color selection of the product
  useEffect(() => {
    if (!product) return;
    const colorOptions = product.colorOptions ?? [];
    const nextImage =
      colorOptions.find((c) => c.name === selectedColor)?.imageUrl ||
      colorOptions[0]?.imageUrl ||
      "";

    if (nextImage && nextImage !== currentImage) {
      setPreviousImage(currentImage);
      setCurrentImage(nextImage);
    }
  }, [selectedColor, product]);


  // crossfade animation of the images
  useEffect(() => {
    if (!previousImage) return;
    const timeout = setTimeout(() => setPreviousImage(""), 500);
    return () => clearTimeout(timeout);
  }, [previousImage]);

  // handling cart states
  const handleAddToCart = () => {
    if (!product) return;

    const colorOptions = product.colorOptions ?? [];
    const storageOptions = product.storageOptions ?? [];

    const selectedColorValue = selectedColor || colorOptions[0]?.name;
    const selectedStorageValue = selectedStorage || storageOptions[0]?.capacity;
    const selectedImage = colorOptions.find(
      (c) => c.name === selectedColorValue
    )?.imageUrl;

    const cartItem: CartItem = {
      id: product.id,
      color: selectedColorValue,
      storage: selectedStorageValue,
      quantity: 1,
      imageUrl: selectedImage || "",
      priceAtAddTime:
        storageOptions.find((s) => s.capacity === selectedStorageValue)
          ?.price || product.basePrice,
    };

    const cart = JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[];
    const existingIndex = cart.findIndex(
      (item) =>
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
    updateCartCount();
  };

  if (loading || !product) return <p></p>;

  const {
    storageOptions = [],
    colorOptions = [],
    similarProducts = [],
  } = product;
  const selectedStoragePrice = storageOptions.find(
    (s) => s.capacity === selectedStorage
  )?.price;

  return (
    <div className={styles.page}>
      <Link href="/" className={styles.back}>
        <LeftArrow /> BACK
      </Link>

      <div className={styles.productInfoImgWrapper}>
        <div className={styles.imageWrapper}>
          {previousImage && (
            <div className={styles.imageFade}>
              <Image
                src={previousImage}
                alt="Previous"
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 934px) 50vw, 20vw"
                className={styles.image}
              />
            </div>
          )}
          {currentImage && (
            <div className={`${styles.imageFade} ${styles.fadeIn}`}>
              <Image
                key={currentImage}
                src={currentImage}
                alt="Current"
                fill
                className={styles.image}
              />
            </div>
          )}
        </div>

        <div className={styles.info}>
          <div className={styles.namePrice}>
            <h1 className={styles.brandName}>
              {product.brand} {product.name}
            </h1>
            <h2 className={styles.price}>
              {selectedStoragePrice
                ? `${selectedStoragePrice} EUR`
                : `FROM ${product.basePrice} EUR`}
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

          <button className={styles.addToCart} onClick={handleAddToCart}>
            AÑADIR
          </button>
        </div>
      </div>

      <Specs specs={product.specs} />
      <div className={styles.similarProducts}>
        <h3 className={styles.similarItemsLabel}>Similar items</h3>
        <ProductGrid products={similarProducts} horizontal />
      </div>
    </div>
  );
}
