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
        state.paymentDetails = action.payload.data;
        state.paymentStatus = action.payload.data.status;
        state.checkoutUrl = action.payload.data.checkoutUrl;
        state.qrCode = action.payload.data.qrCode;
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.loading = false;
        state.paymentError = action.payload;
        state.paymentStatus = "failed";
      });
  },
});

export default paySlice.reducer;
