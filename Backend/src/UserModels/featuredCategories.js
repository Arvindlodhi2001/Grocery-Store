import mongoose, { Schema } from "mongoose";

const FeaturedCategoriesSchema = new Schema(
  {
    subCategories: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    colors: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    mainCategories: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

export const FeaturedCategories = mongoose.model(
  "FeaturedCategories",
  FeaturedCategoriesSchema
);
