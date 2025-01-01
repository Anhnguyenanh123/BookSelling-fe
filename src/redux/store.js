import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/features/cart/catSlice";
import userReducer from "../redux/features/user/userSlice";
import bookReducer from "../redux/features/book/bookSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    book: bookReducer,
  },
});
