import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

// Fetch reviews thunk
export const fetchReviews = createAsyncThunk(
  "review/fetchReviews",
  async ({ page = 0, limit = 10 }, thunkAPI) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("Authorization token not found");
      }

      const response = await axios.get(`${BASE_URL}/review`, {
        params: { page, limit },
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      });

      return response.data; // Return reviews data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch reviews"
      );
    }
  }
);

// Submit review thunk (unchanged from your code)
export const submitReview = createAsyncThunk(
  "review/submitReview",
  async ({ userId, bookId, rating, comment }, thunkAPI) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("Authorization token not found");
      }

      const response = await axios.post(
        `${BASE_URL}/review`,
        {
          userId,
          bookId,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );
      return response.data; // Return the review data to the reducer
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to submit review"
      );
    }
  }
);

// Delete review thunk
export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (reviewId, thunkAPI) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("Authorization token not found");
      }
      const response = await axios.delete(`${BASE_URL}/review/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      });

      return response.data; // Return the reviewId to remove it from the state
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete review"
      );
    }
  }
);

// Update review thunk
export const updateReview = createAsyncThunk(
  "review/updateReview",
  async ({ reviewId, userId, bookId, rating, comment }, thunkAPI) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("Authorization token not found");
      }

      // Send PUT request to the server
      const response = await axios.put(
        `${BASE_URL}/review/${reviewId}`,
        {
          userId,
          bookId,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );

      return response.data; // Return the updated review data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update review"
      );
    }
  }
);

// Review slice
const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [], // To store reviews
    loading: false, // Loading state for review submission and fetching
    error: null, // Error state
    totalPages: 0, // Total pages for paginated data
    currentPage: 0, // Current page number
    totalElements: 0, // Total number of elements
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle review submission
      .addCase(submitReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.push(action.payload); // Add the new review to the reviews list
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle fetching reviews
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.content; // Store the reviews from the API response
        state.totalPages = action.payload.totalPages; // Store the total pages for pagination
        state.currentPage = action.payload.number; // Current page number
        state.totalElements = action.payload.totalElements; // Total elements count
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle deleting review
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = state.reviews.filter(
          (review) => review.id !== action.payload // Remove the deleted review from the list
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle updating review
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        // Update the review in the state
        const updatedReview = action.payload;
        const reviewIndex = state.reviews.findIndex(
          (review) => review.id === updatedReview.id
        );
        if (reviewIndex !== -1) {
          state.reviews[reviewIndex] = updatedReview;
        }
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;
