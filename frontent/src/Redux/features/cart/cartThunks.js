import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Toastify from "../../../Utils/Toastify/Toastify";

const API_URL = import.meta.env.VITE_API_URL;

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, userId, API_URL }, thunkAPI) => {
    try {
      const data = { productId, userId };
      const response = await axios.post(`${API_URL}/cart/add`, data);
      Toastify("success", "Product added to cart successfully!");
      return response.data;
    } catch (error) {
      Toastify(
        "error",
        error.response?.data?.message || "Failed to add product to cart",
      );
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

export const deleteToCart = createAsyncThunk(
  "cart/deleteToCart",
  async ({ productId, userId, API_URL }, thunkAPI) => {
    try {
      const data = { productId, userId };
      const response = await axios.delete(`${API_URL}/cart/remove`, {
        data,
      });
      Toastify("success", "Product removed from cart successfully!");
      return { ...response.data, productId };
    } catch (error) {
      Toastify(
        "error",
        error.response?.data?.message || "Failed to remove product from cart",
      );
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);

export const getAllCart = createAsyncThunk(
  "cart/getAllCart",
  async ({ userId, API_URL }, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/cart/get/${userId}`);
      return response.data;
    } catch (error) {
      Toastify(
        "error",
        error.response?.data?.message || "Failed to get product to cart",
      );
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Something went wrong get product to cart",
      );
    }
  },
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity, userId, API_URL }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/cart/update`, {
        productId,
        quantity,
        userId,
      });
      Toastify("success", "Quantity updated successfully!");
      return response.data;
    } catch (error) {
      Toastify("error", "Failed to update quantity");
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong",
      );
    }
  },
);
