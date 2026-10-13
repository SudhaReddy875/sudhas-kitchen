
import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.dish];

    case "REMOVE":
      return state.filter((item, index) => index !== action.index);

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
