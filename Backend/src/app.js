import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// ✅ Correct CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Preflight (CORS OPTIONS)
app.options("*", cors());

// ✅ Body parsers (use only express)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Cookie Parser
app.use(cookieParser());

// ✅ Static files
app.use("/uploads", express.static("uploads"));

// ✅ Routes Import
import userRoutes from "./userRoutes/user.routes.js";
import adminRouter from "./Admin/adminRouter/admin.router.js";

// ✅ Route Mounting
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRouter);

export { app };

// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import bodyParser from "body-parser";

// const app = express();

// // ✅ Load environment variables
// import dotenv from "dotenv";
// dotenv.config();

// // ✅ Middleware (must be before routes)
// // app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(cors({ origin: "*", credentials: true }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.json({}));
// app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser());
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// // ✅ Import Routes
// import userRoutes from "./userRoutes/user.routes.js";
// import adminRouter from "./Admin/adminRouter/admin.router.js";
// import { upload } from "./middlewares/multer.middlewares.js";

// // ✅ Mount Routes
// app.use("/api/v1/users", userRoutes);
// app.use("/api/v1/admin", adminRouter);

// export { app };

// // -----------------------------------------------------------------------------------
