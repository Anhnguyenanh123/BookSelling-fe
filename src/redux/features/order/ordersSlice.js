import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:8080/api";

//Fetch orders thunk
export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async ({ page = 0, limit = 10 }, thunkAPI) => {
    try {
      const userToken = localStorage.getItem("userToken");
      if (!userToken) {
        throw new Error("Authorization token not found");
      }
      const response = await axios.get(`${BASE_URL}/order`, {
        params: { page, limit },
        headers: {
          Accept: "*/*",
        },
      });

      return response.data; // Return orders data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

//Fetch orders by id thunk
export const fetchOrdersById = createAsyncThunk(
  "order/fetchOrdersById",
  async (userId, thunkAPI) => {
    try {
      const userToken = localStorage.getItem("userToken");
      if (!userToken) {
        throw new Error("Authorization token not found");
      }
      const response = await axios.get(`${BASE_URL}/order/${userId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "*/*",
        },
      });

      return response.data; // Return orders data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

//Submit order by userID thunk
export const fetchOrdersByUserId = createAsyncThunk(
  "order/fetchOrdersByUserId",
  async (userId, thunkAPI) => {
    try {
      const userToken = localStorage.getItem("userToken");
      if (!userToken) {
        throw new Error("Authorization token not found");
      }
      const response = await axios.get(`${BASE_URL}/order/${userId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "*/*",
        },
      });

      return response.data; // Return orders data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

//Create order thunk
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (order, thunkAPI) => {
    try {
      const userToken = localStorage.getItem("userToken");
      if (!userToken) {
        throw new Error("Authorization token not found");
      }
      const totalPrice = order.orderDetails.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
      const orderWithTotal = { ...order, totalPrice };
      const response = await axios.post(`${BASE_URL}/order`, orderWithTotal, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "*/*",
        },
      });

      return response.data; // Return order data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create order"
      );
    }
  }
);

//Update order thunk
export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (order, thunkAPI) => {
    try {
      const userToken = localStorage.getItem("userToken");
      if (!userToken) {
        throw new Error("Authorization token not found");
      }
      const response = await axios.put(`${BASE_URL}/order`, order, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "*/*",
        },
      });

      return response.data; // Return order data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update order"
      );
    }
  }
);

//Delete order thunk
export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (orderId, thunkAPI) => {
    try {
      const userToken = localStorage.getItem("userToken");
      if (!userToken) {
        throw new Error("Authorization token not found");
      }
      const response = await axios.delete(`${BASE_URL}/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "*/*",
        },
      });

      return response.data; // Return order data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete order"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    order: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchOrders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.content;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchOrdersById
      .addCase(fetchOrdersById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrdersById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchOrdersByUserId
      .addCase(fetchOrdersByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // createOrder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload); // Add the newly created order
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // updateOrder
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex((o) => o.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload; // Update the order in the state
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // deleteOrder
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter((o) => o.id !== action.meta.arg); // Remove the deleted order
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
