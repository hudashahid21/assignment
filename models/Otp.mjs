import mongoose from "mongoose";
const { Schema } = mongoose;

const otpSchema = new Schema({
  email: { type: String, required: true },
//   otp: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now, expires: 60 } // 1 min expiry
});

const Otp = mongoose.model("Otp", otpSchema);
export default Otp;
