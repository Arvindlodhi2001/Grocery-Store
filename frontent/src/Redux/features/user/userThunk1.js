import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Toastify from "../../../Utils/Toastify/Toastify";

const API_URL = import.meta.env.VITE_API_URL;

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (formData, { rejectWithValue }) => {
    try {
      console.log(`${API_URL}/signUp`, formData);

      const response = await axios.post(`${API_URL}/signUp`, formData, {
        withCredentials: true,
      });

      Toastify("success", "User created successfully");
      return response.data;
    } catch (error) {
      Toastify("error", "User Signup failed");

      return rejectWithValue(
        error.response?.data?.message || "Something went wrong!",
      );
    }
  },
);

export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async (credentials, { rejectWithValue }) => {
    try {
      console.log(`${API_URL}/signIn`, credentials);

      const response = await axios.post(`${API_URL}/signIn`, credentials, {
        withCredentials: true,
      });

      Toastify("success", "User Signed In successfully");

      return response.data;
    } catch (error) {
      console.log(error);

      Toastify("error", "User Signin failed");

      return rejectWithValue(
        error.response?.data?.message || "Something went wrong!",
      );
    }
  },
);

export const removeUser = createAsyncThunk(
  "auth/removeUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/account/remove`, formData, {
        withCredentials: true,
      });

      Toastify("success", "User removed successfully");

      return response.data;
    } catch (error) {
      Toastify("error", "User removal failed");

      return rejectWithValue(
        error.response?.data?.message || "Something went wrong!!",
      );
    }
  },
);
