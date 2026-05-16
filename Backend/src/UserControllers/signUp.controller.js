import { User } from "../UserModels/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";

const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Hello I m hitt");

  console.log("Received Data:", { name, email, password });

  // ✅ Validate Input
  if (!name || !email || !password) {
    throw new ApiError(400, "❌ Name, email, and password are required");
  }

  const lowerCaseEmail = email.toLowerCase();

  // ✅ Check if user already exists
  const userIsExist = await User.findOne({ email: lowerCaseEmail });
  if (userIsExist) {
    throw new ApiError(400, "❌ User already exists");
  }

  try {
    // ✅ Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("my salt--->", salt);
    // ✅ Create user
    const user = await User.create({
      username: name,
      email: lowerCaseEmail,
      password: hashedPassword,
      hash: salt,
    });

    console.log("✅ User Account Created Successfully:", user._id);

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          { userId: user._id },
          "✅ User Account Created Successfully"
        )
      );
  } catch (error) {
    console.error("❌ Sign-up Error:", error);
    throw new ApiError(500, "❌ User account creation failed");
  }
});

export { signUp };
