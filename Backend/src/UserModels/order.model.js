import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    productID: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    orderID: {
      type: String,
      require: true,
    },

    orderDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      require: true,
    },

    Amount: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderSchema);
