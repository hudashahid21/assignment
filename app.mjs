import express from "express";
import dotenv from "dotenv";
import otpRoutes from "./routes/otpRoutes.mjs";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/otp", otpRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
});
