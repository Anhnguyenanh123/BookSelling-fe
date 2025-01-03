import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/features/cart/catSlice";
import userReducer from "../redux/features/user/userSlice";
import bookReducer from "../redux/features/book/bookSlice";
import reviewReducer from "../redux/features/review/reviewSlice";
import orderReducer from "../redux/features/order/ordersSlice";
import payReducer from "../redux/features/pay/paySlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    book: bookReducer,
    review: reviewReducer,
    order: orderReducer,
    payment: payReducer,
  },
});
