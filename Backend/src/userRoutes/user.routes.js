import { Router } from "express";

import { signUp } from "../UserControllers/signUp.controller.js";
import {
  registerUser,
  userRemoveAccount,
} from "../UserControllers/user.controller.js";

import { upload } from "../middlewares/multer.middlewares.js";
import {
  getAllProducts,
  getProductById,
  productUpload,
} from "../Admin/AdminControllers/productController.js";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  getOneWishlist,
} from "../UserControllers/wishlist.controller.js";

import {
  addToCart,
  getAddToCart,
  removeAddToCart,
  getOneAddToCart,
} from "../UserControllers/addToCart.controller.js";
import { signInUser } from "../UserControllers/signIn.controller.js";
import { compareProducts } from "../UserControllers/compare.controller.js";
import {
  getAllFeaturedCategories,
  getOneFeaturedCategory,
} from "../UserControllers/featuredCategories.controller.js";
import { getAllCategories } from "../Admin/AdminControllers/category.controller.js";
import {
  deleteComment,
  getAllComments,
  uploadComment,
} from "../UserControllers/comment.controller.js";

const router = Router();

//  User Account Sign Up
router.route("/signUp").post(signUp);

//---------------------------------------------------------------------------------

//  User Account Sign In

router.route("/signIn").post(signInUser);

//---------------------------------------------------------------------------------

//  User Account Registration
router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/account/remove").delete(userRemoveAccount);

//---------------------------------------------------------------------------------

//  Product  Router
router.route("/product/byId/:id").get(getProductById);
//localhost:5000/api/v1/users/product/byId/67abf6e7c0123aa2eb52585d
http: router.route("/product/All").get(getAllProducts); //http://localhost:5000/api/v1/users/product/All

//---------------------------------------------------------------------------------

//  Wishlist Router
router.route("/wishlist/add").post(addToWishlist);
router.route("/wishlist/get/:userId").get(getWishlist);
router.route("/wishlist/getOne/:userId/:productId").get(getOneWishlist);
router.route("/wishlist/remove").delete(removeFromWishlist);

//---------------------------------------------------------------------------------

//  Add To Cart Router
router.route("/cart/add").post(addToCart);
router.route("/cart/get/:userId").get(getAddToCart);
router.route("/cart/getOne/:userId/:productId").get(getOneAddToCart);
router.route("/cart/remove").delete(removeAddToCart);

//---------------------------------------------------------------------------------

// Product Compare
router.route("/products/compare").post(compareProducts);

//---------------------------------------------------------------------------------

// featured Categories

router.get("/featuredCategories/getAll", getAllFeaturedCategories);
router.get("/featuredCategories/getOne/:categoryId", getOneFeaturedCategory);

//---------------------------------------------------------------------------------

// Category Router
router.route("/category/getAll").get(getAllCategories);
router.route("/category/getOne/:categoryId").get(getOneFeaturedCategory);

//---------------------------------------------------------------------------------

//Comment Router
router
  .route("/comment/upload")
  .post(upload.array("imageFiles", 5), uploadComment);
router.route("/comment/delete").delete(deleteComment);
router.route("/comment/:productId").get(getAllComments);

export default router;
