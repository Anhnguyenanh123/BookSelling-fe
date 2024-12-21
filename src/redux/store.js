import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/features/cart/catSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
