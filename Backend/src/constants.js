// ✅ config.js

import dotenv from "dotenv";
dotenv.config(); // Load .env file

export const PORT = process.env.PORT || 3000;

export const DB_NAME = process.env.DB_NAME || "Grocery";

export const MONGODB_URI = process.env.MONGODB_URI;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ACCESS_TOKEN_EXPIRE = process.env.ACCESS_TOKEN_EXPIRE || "1d";

export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const REFRESH_TOKEN_EXPIRE = process.env.REFRESH_TOKEN_EXPIRE || "10d";

export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

// export const DB_NAME = "Grocery";
// export const PORT = 2020;

// export const MONGODB_URI =
//   "mongodb+srv://Grocery:GroceryPassword%40123@cluster0.gc8rq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// export const ACCESS_TOKEN_SECRET =
//   "a3f4e2b6d7c8e9f01234567890abcdef1234567890abcdef1234567890abcdef";

// export const ACCESS_TOKEN_EXPIRE = "1d";

// export const REFRESH_TOKEN_SECRET =
//   "f9a8e7c6d5b4a31234567890abcdef1234567890abcdef1234567890abcdef";

// export const REFRESH_TOKEN_EXPIRE = "10d";

// //  cloudinary Configuration

// export const CLOUDINARY_NAME = "dfxqem8nb";

// export const CLOUDINARY_API_KEY = "775734745811181";

// export const CLOUDINARY_API_SECRET = "mh6jhHtmT2YOpfbnQXBcJ2KYTDU";
