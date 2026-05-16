import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/index.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running successfully on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`❌ MongoDB Connection Failed!`);
    console.error(error.message);
    process.exit(1);
  });
