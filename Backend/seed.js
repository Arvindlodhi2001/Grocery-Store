// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// // ================= MODELS =================
// import { User } from "./src/UserModels/user.model.js";
// import { Address } from "./src/UserModels/address.modal.js";
// import { AddToCart } from "./src/UserModels/addToCart.modal.js";
// import { Category } from "./src/UserModels/category.modal.js";
// import { Comment } from "./src/UserModels/comment.modal.js";
// import { Order } from "./src/UserModels/order.model.js";
// import { Product } from "./src/UserModels/product.modal.js";
// import { Wishlist } from "./src/UserModels/wishlist.modal.js";
// import { DailyBestSells } from "./src/UserModels/DailyBestSells.modal.js";
// import { FeaturedCategories } from "./src/UserModels/featuredCategories.js";

// // ================= CONNECT DB =================
// await mongoose.connect(process.env.MONGODB_URI);
// console.log("MongoDB Connected");

// // ================= CLEAN DB =================
// await Promise.all([
//   User.deleteMany({}),
//   Address.deleteMany({}),
//   AddToCart.deleteMany({}),
//   Category.deleteMany({}),
//   Comment.deleteMany({}),
//   Order.deleteMany({}),
//   Product.deleteMany({}),
//   Wishlist.deleteMany({}),
//   DailyBestSells.deleteMany({}), // ✅ included
//   FeaturedCategories.deleteMany({}), // ✅ included
// ]);

// console.log("Old Data Deleted");

// // ================= HELPERS =================
// const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
// const price = () => Math.floor(Math.random() * 90000) + 1000;
// const rating = () => +(Math.random() * 2 + 3).toFixed(1);

// const commentPool = [
//   "Amazing product 🔥",
//   "Worth it 💯",
//   "Good quality",
//   "Fast delivery 🚀",
//   "Highly recommended",
//   "Very satisfied",
//   "Better than expected",
//   "Nice product",
//   "Excellent build",
//   "Value for money",
// ];

// // ================= USERS (10) =================
// const users = await User.insertMany(
//   Array.from({ length: 10 }).map((_, i) => ({
//     username: `User${i + 1}`,
//     email: `user${i + 1}@gmail.com`,
//     Mobile: `99999999${i}`,
//     password: "123456",
//     address: [],
//     Order: [],
//     Wishlist: [],
//     cart: null,
//   })),
// );

// console.log("Users Created");

// // ================= CATEGORIES =================
// const categories = await Category.insertMany([
//   {
//     name: "electronics",
//     title: "Electronics",
//     description: "Electronic gadgets",
//   },
//   { name: "fashion", title: "Fashion", description: "Clothing items" },
//   { name: "groceries", title: "Groceries", description: "Daily essentials" },
// ]);

// console.log("Categories Created");

// // ================= PRODUCTS (40) =================
// const products = await Product.insertMany(
//   Array.from({ length: 40 }).map((_, i) => ({
//     tag: "best",
//     category: [random(categories).name],
//     brand: `Brand${i + 1}`,
//     productName: `Product ${i + 1}`,
//     title: `Amazing Product ${i + 1}`,
//     description: `This is product ${i + 1}`,
//     price: price(),
//     oldPrice: price() + 1000,
//     rating: rating(),
//     stock: Math.floor(Math.random() * 200),
//     quantity: ["1", "2", "3"],
//     imageFiles: [
//       "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
//     ],
//     thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
//     color: ["Black", "White"],
//     comments: [],
//   })),
// );

// console.log("Products Created");

// // ================= COMMENTS (1200) =================
// let allComments = [];

// for (let product of products) {
//   for (let i = 0; i < 30; i++) {
//     const user = random(users);

//     allComments.push({
//       productId: product._id,
//       userId: user._id,
//       commentText: random(commentPool),
//       imageFiles: [],
//     });
//   }
// }

// const comments = await Comment.insertMany(allComments);
// console.log("1200 Comments Created");

// // ================= LINK COMMENTS TO PRODUCTS =================
// for (let c of comments) {
//   await Product.findByIdAndUpdate(c.productId, {
//     $push: { comments: c._id },
//   });
// }

// // ================= DAILY BEST SELLS =================
// await DailyBestSells.insertMany(
//   products.slice(0, 5).map((p) => ({
//     tag: "top",
//     category: [categories[0]._id],
//     brand: p.brand,
//     productName: p.productName,
//     title: p.title,
//     description: p.description,
//     price: p.price,
//     oldPrice: p.oldPrice,
//     rating: p.rating,
//     stock: p.stock,
//     imageFiles: p.imageFiles,
//     thumbnail: p.thumbnail,
//     views: Math.floor(Math.random() * 5000),
//     comments: [],
//   })),
// );

// console.log("DailyBestSells Created");

// // ================= FEATURED CATEGORIES =================
// await FeaturedCategories.insertMany(
//   categories.map((c) => ({
//     subCategories: c.name,
//     name: c.title,
//     quantity: Math.floor(Math.random() * 100),
//     colors: "Multi",
//     title: `${c.title} Deals`,
//     description: c.description,
//     image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
//     mainCategories: c._id,
//   })),
// );

// console.log("FeaturedCategories Created");

// // ================= WISHLIST =================
// for (let user of users) {
//   const wishlistProducts = products.sort(() => 0.5 - Math.random()).slice(0, 5);

//   const wishlist = await Wishlist.create({
//     userId: user._id,
//     products: wishlistProducts.map((p) => p._id),
//   });

//   user.Wishlist.push(wishlist._id);
//   await user.save();
// }

// console.log("Wishlist Created");

// // ================= CART =================
// for (let user of users) {
//   const cartProducts = products.sort(() => 0.5 - Math.random()).slice(0, 3);

//   const cart = await AddToCart.create({
//     userId: user._id,
//     products: cartProducts.map((p) => p._id),
//   });

//   user.cart = cart._id;
//   await user.save();
// }

// console.log("Cart Created");

// // ================= ORDERS =================
// for (let user of users) {
//   const product = random(products);

//   const order = await Order.create({
//     userID: user._id,
//     productID: product._id,
//     orderID: `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`,
//     status: "Delivered",
//     Amount: product.price,
//   });

//   user.Order.push(order._id);
//   await user.save();
// }

// console.log("Orders Created");

// // ================= DONE =================
// console.log("🚀 FULL LARGE SEED COMPLETED SUCCESSFULLY");

// process.exit();

// seed.js

// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// // ================= IMPORT MODELS =================
// import { User } from "./src/UserModels/user.model.js";
// import { Address } from "./src/UserModels/address.modal.js";
// import { AddToCart } from "./src/UserModels/addToCart.modal.js";
// import { Category } from "./src/UserModels/category.modal.js";
// import { Comment } from "./src/UserModels/comment.modal.js";
// import { DailyBestSells } from "./src/UserModels/DailyBestSells.modal.js";
// import { FeaturedCategories } from "./src/UserModels/featuredCategories.js";
// import { Order } from "./src/UserModels/order.model.js";
// import { Product } from "./src/UserModels/product.modal.js";
// import { Wishlist } from "./src/UserModels/wishlist.modal.js";

// // ================= CONNECT DB =================
// await mongoose.connect(process.env.MONGODB_URI);

// console.log("MongoDB Connected");

// ================= DELETE OLD DATA =================
// await User.deleteMany({});
// await Address.deleteMany({});
// await AddToCart.deleteMany({});
// await Category.deleteMany({});
// await Comment.deleteMany({});
// await DailyBestSells.deleteMany({});
// await FeaturedCategories.deleteMany({});
// await Order.deleteMany({});
// await Product.deleteMany({});
// await Wishlist.deleteMany({});

// console.log("Old Data Deleted");

// // ================= CATEGORY =================
// const categories = await Category.insertMany([
//   {
//     name: "electronics",
//     title: "Electronics",
//     description: "Electronic gadgets and accessories",
//     image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
//   },
//   {
//     name: "fashion",
//     title: "Fashion",
//     description: "Trending fashion products",
//     image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
//   },
//   {
//     name: "groceries",
//     title: "Groceries",
//     description: "Daily grocery items",
//     image: "https://images.unsplash.com/photo-1542838132-92c53300491e",
//   },
// ]);

// console.log("Categories Inserted");

// // ================= PRODUCTS =================
// const products = await Product.insertMany([
//   {
//     tag: "hot",
//     category: ["electronics"],
//     brand: "Apple",
//     productName: "iPhone 15 Pro",
//     title: "Apple iPhone 15 Pro Max",
//     description: "Latest Apple smartphone",
//     price: 159999,
//     oldPrice: 169999,
//     rating: 4.8,
//     stock: 50,
//     quantity: ["128GB", "256GB", "512GB"],
//     imageFiles: [
//       "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
//     ],
//     thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
//     condition: "New",
//     color: ["Black", "Blue", "White"],
//   },

//   {
//     tag: "sale",
//     category: ["fashion"],
//     brand: "Nike",
//     productName: "Nike Shoes",
//     title: "Nike Running Shoes",
//     description: "Comfortable sports shoes",
//     price: 4999,
//     oldPrice: 6999,
//     rating: 4.5,
//     stock: 100,
//     quantity: ["7", "8", "9", "10"],
//     imageFiles: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff"],
//     thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
//     condition: "New",
//     color: ["Red", "Black"],
//   },

//   {
//     tag: "best",
//     category: ["groceries"],
//     brand: "Aashirvaad",
//     productName: "Wheat Flour",
//     title: "Aashirvaad Atta 10kg",
//     description: "Healthy wheat flour",
//     price: 499,
//     oldPrice: 599,
//     rating: 4.2,
//     stock: 200,
//     quantity: ["5kg", "10kg"],
//     imageFiles: [
//       "https://images.unsplash.com/photo-1509440159596-0249088772ff",
//     ],
//     thumbnail: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
//     condition: "Fresh",
//     color: ["Brown"],
//   },
// ]);

// console.log("Products Inserted");

// // ================= USERS =================
// const users = await User.create([
//   {
//     username: "Arvind",
//     email: "arvind@gmail.com",
//     Mobile: "9876543210",
//     avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
//     password: "Arvind@123",
//   },

//   {
//     username: "Rahul",
//     email: "rahul@gmail.com",
//     Mobile: "9876543211",
//     avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
//     password: "Rahul@123",
//   },
// ]);

// console.log("Users Inserted");

// // ================= ADDRESS =================
// const addresses = await Address.insertMany([
//   {
//     userID: users[0]._id,
//     streetNo: "12",
//     houseNo: "A-101",
//     city: "Bhopal",
//     tehsil: "Huzur",
//     district: "Bhopal",
//     state: "Madhya Pradesh",
//     pinNo: 462001,
//     Mobile1: "9876543210",
//     Mobile2: "9999999999",
//     CurrentLocationURL: "https://maps.google.com",
//   },

//   {
//     userID: users[1]._id,
//     streetNo: "45",
//     houseNo: "B-202",
//     city: "Indore",
//     tehsil: "Sanwer",
//     district: "Indore",
//     state: "Madhya Pradesh",
//     pinNo: 452001,
//     Mobile1: "9876543211",
//     Mobile2: "8888888888",
//     CurrentLocationURL: "https://maps.google.com",
//   },
// ]);

// console.log("Addresses Inserted");

// // ================= COMMENTS =================
// const comments = await Comment.insertMany([
//   {
//     productId: products[0]._id,
//     userId: users[0]._id,
//     commentText: "Amazing iPhone performance 🔥",
//     imageFiles: [],
//   },

//   {
//     productId: products[1]._id,
//     userId: users[1]._id,
//     commentText: "Shoes quality is very good",
//     imageFiles: [],
//   },
// ]);

// console.log("Comments Inserted");

// // ================= UPDATE PRODUCTS COMMENTS =================
// products[0].comments.push(comments[0]._id);
// products[1].comments.push(comments[1]._id);

// await products[0].save();
// await products[1].save();

// // ================= CART =================
// const cart = await AddToCart.create({
//   userId: users[0]._id,
//   products: [products[0]._id, products[1]._id],
// });

// console.log("Cart Inserted");

// // ================= WISHLIST =================
// const wishlist = await Wishlist.create({
//   userId: users[0]._id,
//   products: [products[2]._id],
// });

// console.log("Wishlist Inserted");

// // ================= ORDERS =================
// const orders = await Order.insertMany([
//   {
//     userID: users[0]._id,
//     productID: products[0]._id,
//     orderID: "ORD1001",
//     status: "Delivered",
//     Amount: 159999,
//   },

//   {
//     userID: users[1]._id,
//     productID: products[1]._id,
//     orderID: "ORD1002",
//     status: "Pending",
//     Amount: 4999,
//   },
// ]);

// console.log("Orders Inserted");

// // ================= DAILY BEST SELLS =================
// await DailyBestSells.insertMany([
//   {
//     tag: "top",
//     category: [categories[0]._id],
//     brand: "Apple",
//     productName: "iPhone 15 Pro",
//     title: "Top Selling iPhone",
//     description: "Best selling smartphone",
//     price: 159999,
//     oldPrice: 169999,
//     rating: 4.9,
//     stock: 20,
//     imageFiles: [
//       "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
//     ],
//     thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
//     views: 1200,
//     comments: [comments[0]._id],
//   },
// ]);

// console.log("Daily Best Sells Inserted");

// // ================= FEATURED CATEGORIES =================
// await FeaturedCategories.insertMany([
//   {
//     subCategories: "Mobiles",
//     name: "iPhone",
//     quantity: 20,
//     colors: "Black",
//     title: "Premium Mobile",
//     description: "Apple flagship smartphone",
//     image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
//     mainCategories: categories[0]._id,
//   },
// ]);

// console.log("Featured Categories Inserted");

// // ================= UPDATE USER =================
// users[0].address.push(addresses[0]._id);
// users[1].address.push(addresses[1]._id);

// users[0].Order.push(orders[0]._id);
// users[1].Order.push(orders[1]._id);

// users[0].cart = cart._id;

// users[0].Wishlist.push(wishlist._id);

// await users[0].save();
// await users[1].save();

// console.log("Users Updated");

// // ================= DONE =================
// console.log("Production Level Sample Data Inserted Successfully");

// process.exit();

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// MODELS
import { User } from "./src/UserModels/user.model.js";

// ================= CONNECT DB =================
await mongoose.connect(process.env.MONGODB_URI);

console.log("MongoDB Connected");

// ================= CLEAN USERS (optional but safe) =================
await User.deleteMany({});

// ================= USERS =================
const users = await User.create([
  {
    username: "Arvind",
    email: "arvind@gmail.com",
    Mobile: "9876543210",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    password: "Arvind@123",
    address: [],
    Order: [],
    Wishlist: [],
    cart: null,
  },
  {
    username: "Rahul",
    email: "rahul@gmail.com",
    Mobile: "9876543211",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    password: "Rahul@123",
    address: [],
    Order: [],
    Wishlist: [],
    cart: null,
  },
]);

console.log("Users Inserted:", users.length);

// ================= DONE =================
console.log("Seed Completed");

process.exit();
