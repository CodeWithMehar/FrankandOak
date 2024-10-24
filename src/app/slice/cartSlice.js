import { createSlice } from "@reduxjs/toolkit";

// Safely initialize the cart state from localStorage or use an empty array
const getInitialCartState = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Error parsing cart from localStorage:", error);
    return [];
  }
};

// Initialize the cart state
const initialState = {
  cart: getInitialCartState(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtocart: (state, action) => {
      state.cart.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cart)); // Update localStorage
    },
    removeCart: (state, action) => {
      const pid = action.payload.pId;
      state.cart = state.cart.filter((item) => item.pId !== pid);
      localStorage.setItem("cart", JSON.stringify(state.cart)); // Update localStorage
    },
    changeQty: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.pId === action.payload.pId) {
          item.quantity = action.payload.qty;
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(state.cart)); // Update localStorage
    },
    clearCart: (state) => {
      state.cart = []; // Clear the cart
      localStorage.setItem("cart", JSON.stringify(state.cart)); // Update localStorage
    },
  },
});

// Export the actions and reducer
export const { addtocart, removeCart, changeQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
