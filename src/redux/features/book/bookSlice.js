import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:8080/api";

export const fetchBooks = createAsyncThunk(
  "book/fetchBooks",
  async ({ page = 0, limit = 10 }, thunkAPI) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("Authorization token not found");
      }

      const response = await axios.get(`${BASE_URL}/book`, {
        params: { page, limit },
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch books"
      );
    }
  }
);

export const fetchBookById = createAsyncThunk(
  "book/fetchBookById",
  async (bookId, thunkAPI) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("Authorization token not found");
      }

      const response = await axios.get(`${BASE_URL}/book/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch book"
      );
    }
  }
);

export const addBook = createAsyncThunk(
  "book/addBook",
  async (book, thunkAPI) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("Authorization token not found");
      }

      const response = await axios.post(`${BASE_URL}/book`, book, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      });
      console.log("Book added:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add book"
      );
    }
  }
);

export const updateBook = createAsyncThunk(
  "book/updateBook",
  async (book, thunkAPI) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("Authorization token not found");
      }

      const response = await axios.put(`${BASE_URL}/book`, book, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update book"
      );
    }
  }
);

export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (bookId, thunkAPI) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("Authorization token not found");
      }

      const response = await axios.delete(`${BASE_URL}/book/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete book"
      );
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [], // To store book list
    book: null, // To store a single book
    loading: false, // Loading state for all operations
    error: null, // Error message
    totalPages: 0, // Total pages for paginated data
    currentPage: 0, // Current page number
    totalElements: 0, // Total number of elements
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Books
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload.content;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.pageable.pageNumber;
        state.totalElements = action.payload.totalElements;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Book by ID
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.book = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Book
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books.push(action.payload); // Add new book to the list
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Book
      .addCase(updateBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.books.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) {
          state.books[index] = action.payload; // Update the book in the list
        }
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Book
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.filter((book) => book.id !== action.meta.arg);
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookSlice.reducer;
