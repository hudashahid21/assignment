import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.mjs";
import otpRoutes from "./routes/otpRoutes.mjs";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
connectDB();

app.use("/api/otp", otpRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
