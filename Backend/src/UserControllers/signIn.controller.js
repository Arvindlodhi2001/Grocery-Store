import { User } from "../UserModels/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt, { genSalt } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const signInUser = asyncHandler(async (req, res) => {
  console.log("Hello I m hitt");

  const { email, password } = req.body;

  console.log("📩 Received Login Request:", { email, password });

  // ✅ 1. Validate input
  if (!email || !password) {
    throw new ApiError(400, "❌ Email and password are required");
  }

  // ✅ 2. Find user by email (case-insensitive)
  const user = await User.findOne({ email: email.toLowerCase() });

  const hashedPassword = await bcrypt.hash(password, user.hash);

  if (!user) {
    throw new ApiError(400, "❌ Account does not exist");
  }

  // ✅ 3. Ensure the stored password exists
  if (!user.password) {
    throw new ApiError(
      500,
      "❌ Password data is missing. Please reset your password."
    );
  }

  console.log("user.password---", user.password);
  console.log("password---", hashedPassword);

  // ✅ 4. Compare password with hashed password
  const isMatch = await bcrypt.compare(hashedPassword, user.password);
  console.log("Password Match:", isMatch);

  if (!isMatch) {
    throw new ApiError(401, "❌ Invalid credentials");
  }

  // ✅ 5. Generate JWT token securely
  const token = jwt.sign(
    { _id: user._id, email: user.email, username: user.username },
    process.env.JWT_SECRET || "fallback-secret-key",
    { expiresIn: "1d" }
  );

  const updateResult = await User.updateOne(
    { email: email.toLowerCase() },
    { $set: { refreshToken: token } }
  );

  console.log("user", user);

  // ✅ 6. Send response
  res.status(200).json(
    new ApiResponse(
      200,
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        token: token,
        mobile: user.mobile,
        avatar: user.avatar,
        address: user.address,
        order: user.order,
        wishlist: user.wishlist,
        cart: user.cart,
        API_URL: "http://localhost:5000/api/v1/users",
      },
      "✅ Login successful"
    )
  );
});

export { signInUser };
