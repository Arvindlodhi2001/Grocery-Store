import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Toastify from "../../../Utils/Toastify/Toastify";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/product/All`);
      return response.data.data;
    } catch (error) {
      Toastify("error", "Product Fetch Failed");
      return rejectWithValue(
        error.response?.data?.message || "Product fetch failed",
      );
    }
  },
);
