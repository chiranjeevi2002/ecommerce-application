import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = sessionStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const save = (items) => {
    setCart(items);
    sessionStorage.setItem("cart", JSON.stringify(items));
  };

  const addToCart = (product) => {
    const storeId = Number(sessionStorage.getItem("storeId"));

    let updated = [...cart];
    const index = updated.findIndex(
      (item) => item.id === product.id && item.storeId === storeId
    );

    if (index >= 0) {
      updated[index].quantity += 1;
    } else {
      updated.push({ ...product, quantity: 1, storeId });
    }

    save(updated);
  };

  const removeFromCart = (id) => {
    save(cart.filter((item) => item.id !== id));
  };

  const updateQty = (id, qty) => {
    let updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: qty } : item
    );
    save(updated);
  };

  const clearCart = () => save([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
