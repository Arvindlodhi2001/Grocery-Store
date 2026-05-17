import { AddToCart } from "./../UserModels/addToCart.modal.js";
import { Product } from "./../UserModels/product.modal.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../UserModels/user.model.js";

// Add to Cart
//------------------------------------------------------------------------
const addToCart = asyncHandler(async (req, res) => {
  console.log("Request Body:", req.body);
  const { userId, productId } = req.body;
  console.log(userId, productId);

  if (!userId || !productId) {
    throw new ApiError(400, "User ID and Product ID are required");
  }

  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, "Product not found");

  let addToCart = await AddToCart.findOne({ userId });

  if (!addToCart) {
    // Create new cart and link it to the user
    addToCart = await AddToCart.create({
      userId,
      products: [productId],
    });

    // Update user cart field with the new AddToCart _id
    await User.findByIdAndUpdate(userId, { cart: addToCart._id });
    console.log("User-->", User);
  } else {
    // If cart exists, add product to the cart if not already present
    if (!addToCart.products.includes(productId)) {
      addToCart.products.push(productId);
      await addToCart.save();
    }
  }

  console.log("Updated AddToCart:", addToCart);

  return res.status(200).json({
    success: true,
    message: "Product added to cart",
    addToCart,
  });
});

//------------------------------------------------------------------------------

const getAddToCart = asyncHandler(async (req, res) => {
  console.log(req.params);
  const { userId } = req.params;

  if (!userId) throw new ApiError(400, "User ID is required");

  const addToCart = await AddToCart.findOne({ userId }).populate("products");

  if (!addToCart) {
    throw new ApiError(404, "No Add To Cart product found for this user");
  }

  return res.status(200).json({ success: true, addToCart });
});

const removeAddToCart = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;
  console.log("userId, productId ", userId, productId);
  if (!userId || !productId)
    throw new ApiError(400, "User ID and Product ID are required");

  let addToCart = await AddToCart.findOne({ userId });

  if (!addToCart) throw new ApiError(404, "AddToCart Product  not found");

  addToCart.products = addToCart.products.filter(
    (id) => id.toString() !== productId
  );
  await addToCart.save();

  res.status(200).json({
    success: true,
    message: "Product removed from Add To Cart",
    addToCart,
  });
});

//------------------------------------------------------------------------------

const getOneAddToCart = asyncHandler(async (req, res) => {
  console.log("Received Params:", req.params);

  const { userId, productId } = req.params;

  if (!userId || !productId) {
    throw new ApiError(400, "User ID and Product ID are required");
  }

  // Find the cart for the specific user
  const userCart = await AddToCart.findOne({ userId }).populate("products");

  if (!userCart) {
    throw new ApiError(404, "No cart found for this user");
  }

  // Find the specific product in the cart
  const product = userCart.products.find(
    (item) => item._id.toString() === productId
  );

  if (!product) {
    throw new ApiError(404, "Product not found in the cart");
  }

  return res.status(200).json({
    success: true,
    message: "Product retrieved successfully from cart",
    product,
  });
});



export { addToCart, getAddToCart, removeAddToCart, getOneAddToCart };
