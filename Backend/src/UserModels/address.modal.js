import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    streetNo: {
      type: String,
      required: true,
    },
    houseNo: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    tehsil: {
      type: String,
      required: false,
    },
    district: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pinNo: {
      type: Number,
      required: true,
    },
    Mobile1: {
      type: String,
      required: true,
    },
    Mobile2: {
      type: String,
      required: false,
    },
    CurrentLocationURL: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Address = mongoose.model("Address", addressSchema);
