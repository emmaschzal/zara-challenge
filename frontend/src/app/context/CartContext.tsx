"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { CartItem } from "@/app/types/ProductFullInfo";


// control updates & delete
type CartContextType = {
  cartCount: number;
  updateCartCount: () => void;
};

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  updateCartCount: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
