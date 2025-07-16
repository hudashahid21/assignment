import nodemailer from "nodemailer";
import otpStore from "../models/Otp.mjs";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, { otp, timestamp: Date.now() });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      html: `<h3>Your OTP is: <b>${otp}</b></h3><p>Valid for 2 minutes.</p>`,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Mail Error:", err);
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
};

export const verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  const stored = otpStore.get(email);

  if (!stored) {
    return res.status(400).json({ message: "OTP not found for this email" });
  }

  if (Date.now() - stored.timestamp > 2 * 60 * 1000) {
    otpStore.delete(email);
    return res.status(400).json({ message: "OTP expired" });
  }

  if (stored.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  otpStore.delete(email);
  res.status(200).json({ message: "OTP verified successfully" });
};
