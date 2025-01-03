import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createPayment } from "../../../services/PayosServices";

export const initiatePayment = createAsyncThunk(
  "payment/initiatePayment",
  async (orderId, { rejectWithValue }) => {
    try {
      const paymentData = await createPayment(orderId);
      return paymentData;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Create the payment slice
const paySlice = createSlice({
  name: "payment",
  initialState: {
    paymentStatus: null,
    paymentError: null,
    paymentDetails: null,
    loading: false,
    checkoutUrl: null,
    qrCode: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initiatePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload?.data;
        if (data) {
          state.paymentDetails = data;
          state.paymentStatus = data.status;
          state.checkoutUrl = data.checkoutUrl;
          state.qrCode = data.qrCode;
        } else {
          state.paymentError = "Invalid payment data";
          state.paymentStatus = "failed";
        }
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.loading = false;
        state.paymentError = action.payload;
        state.paymentStatus = "failed";
      });
  },
});

export default paySlice.reducer;
