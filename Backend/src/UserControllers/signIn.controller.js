import { User } from "../UserModels/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { logger } from "../utils/logger.js";
import { validateSignIn } from "../utils/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input using Joi
  const { error, value } = validateSignIn({ email, password });
  if (error) {
    const errorMessages = error.details.map((d) => d.message).join(", ");
    logger.warn({ email }, `Validation failed: ${errorMessages}`);
    throw new ApiError(400, errorMessages);
  }

  logger.info({ email }, "Login attempt");

  // Find user by email (case-insensitive)
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    logger.warn({ email }, "Account does not exist");
    throw new ApiError(400, "Invalid credentials");
  }

  // Ensure the stored password exists
  if (!user.password) {
    logger.error({ userId: user._id }, "Password data is missing");
    throw new ApiError(
      500,
      "Password data is missing. Please reset your password."
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    logger.warn({ email }, "Invalid password");
    throw new ApiError(401, "Invalid credentials");
  }

  const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
  if (!jwtSecret) {
    logger.error("JWT_SECRET is not configured");
    throw new ApiError(500, "Server configuration error");
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email, username: user.username },
    jwtSecret,
    { expiresIn: "1d" }
  );

  await User.updateOne(
    { email: email.toLowerCase() },
    { $set: { refreshToken: token } }
  );

  logger.info({ userId: user._id, email }, "Login successful");

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
      },
      "Login successful"
    )
  );
});

export { signInUser };
