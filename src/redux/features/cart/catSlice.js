import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import {
  createCart,
  getCart,
  updateCart,
  removeCart,
  deleteCart,
} from "./cartAPI";

const initialState = {
  cartItems: [],
  cartId: null,
  loading: false,
  error: null,
};

// Thunks for each API
export const createCartThunk = createAsyncThunk(
  "cart/createCart",
  async ({ userId, bookId, token }, { rejectWithValue }) => {
    try {
      const data = await createCart(userId, bookId, token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getCartThunk = createAsyncThunk(
  "cart/getCart",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const data = await getCart(userId, token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateCartThunk = createAsyncThunk(
  "cart/updateCart",
  async ({ userId, bookId, quantity, token }, { rejectWithValue }) => {
    try {
      const data = await updateCart(userId, bookId, quantity, token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeCartThunk = createAsyncThunk(
  "cart/removeCart",
  async ({ userId, bookId, token }, { rejectWithValue }) => {
    try {
      const data = await removeCart(userId, bookId, token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteCartThunk = createAsyncThunk(
  "cart/deleteCart",
  async ({ userId, token }, { rejectWithValue }) => {
    try {
      const data = await deleteCart(userId, token);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice definition
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (!existingItem) {
        state.cartItems.push({ ...action.payload, quantity: 1 });
        Swal.fire({
          icon: "success",
          title: "Item added to cart",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Item already in cart",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartId = null;
    },
  },
  extraReducers: (builder) => {
    // Create cart
    builder
      .addCase(createCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.orderDetails || [];
        state.cartId = action.payload.id;
        Swal.fire({
          icon: "success",
          title: "Cart created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .addCase(createCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create cart";
        Swal.fire({
          icon: "error",
          title: "Failed to create cart",
          text: state.error,
          showConfirmButton: true,
        });
      });

    // Get cart
    builder
      .addCase(getCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.orderDetails || [];
        state.cartId = action.payload.id;
      })
      .addCase(getCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch cart";
      });

    // Update cart
    builder
      .addCase(updateCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.orderDetails || [];
      })
      .addCase(updateCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update cart";
      });

    // Remove item from cart
    builder
      .addCase(removeCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.orderDetails || [];
      })
      .addCase(removeCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to remove item from cart";
      });

    // Delete entire cart
    builder
      .addCase(deleteCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCartThunk.fulfilled, (state) => {
        state.loading = false;
        state.cartItems = [];
        state.cartId = null;
      })
      .addCase(deleteCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete cart";
      });
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
