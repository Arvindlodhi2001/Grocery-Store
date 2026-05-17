import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteToCart,
  getAllCart,
  updateCartQuantity,
} from "./cartThunks";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    isLoading: false,
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // ✅ Add to Cart
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems.push(action.payload);
        state.message = "Item added successfully";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // ✅ Delete from Cart
    builder
      .addCase(deleteToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(deleteToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload.productId,
        );
        state.message = "Item deleted successfully";
      })
      .addCase(deleteToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // ✅ Get All Product from Cart

    builder
      .addCase(getAllCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(getAllCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.addToCart.products;
        state.message = "Cart items fetched successfully!";
      })
      .addCase(getAllCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder.addCase(updateCartQuantity.fulfilled, (state, action) => {
      const updatedProduct = action.payload;
      console.log(
        "updatedProduct -------------------------- ",
        JSON.stringify(updatedProduct, null, 2),
      );
      const index = state.cartItems.findIndex(
        (item) => item._id === updatedProduct._id,
      );
      if (index !== -1) {
        state.cartItems[index].quantity = updatedProduct.quantity;
      }
    });
  },
});

export default cartSlice.reducer;
