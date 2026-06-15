import {
  createContext,
  useState,
  useEffect
} from "react";

export const CartContext =
  createContext();

export function CartProvider({
  children
}) {

  console.log(
    "CartProvider render"
  );

  const [cartItems, setCartItems] =
    useState(() => {

      const savedCart =
        localStorage.getItem(
          "cartItems"
        );

      return savedCart
        ? JSON.parse(savedCart)
        : [];

    });

  useEffect(() => {

    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );

  }, [cartItems]);

  const addToCart = (
    product
  ) => {

    console.log(
      "ADDING",
      product
    );

    const existingItem =
      cartItems.find(
        item =>
          item.id === product.id
      );

    if (existingItem) {

      setCartItems(
        cartItems.map(item =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1
              }
            : item
        )
      );

    } else {

      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1
        }
      ]);

    }
  };

  const removeFromCart =
    (productId) => {

      setCartItems(
        cartItems.filter(
          item =>
            item.id !==
            productId
        )
      );

    };

  const clearCart = () => {

    setCartItems([]);

  };

  return (

    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart
      }}
    >

      {children}

    </CartContext.Provider>

  );

}