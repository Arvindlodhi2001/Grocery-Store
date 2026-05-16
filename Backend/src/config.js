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

// import dotenv from "dotenv";

// dotenv.config();

// export const DB_NAME = process.env.DB_NAME;
// export const PORT = process.env.PORT;

// export const MONGODB_URI = process.env.MONGODB_URI;

// export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
// export const ACCESS_TOKEN_EXPIRE = process.env.ACCESS_TOKEN_EXPIRE;

// export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
// export const REFRESH_TOKEN_EXPIRE = process.env.REFRESH_TOKEN_EXPIRE;

// // Cloudinary Configuration
// export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
// export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
// export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
