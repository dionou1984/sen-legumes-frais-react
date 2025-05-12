import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.nom === product.nom);
      if (exists) {
        return prev.map((p) =>
          p.nom === product.nom ? { ...p, qte: p.qte + 1 } : p
        );
      }
      return [...prev, { ...product, qte: 1 }];
    });
  };

  const removeFromCart = (nom) => {
    setCart((prev) => prev.filter((p) => p.nom !== nom));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
