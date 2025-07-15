import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.mjs';
import otpRoutes from './routes/otpRoutes.mjs';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/otp', otpRoutes);

app.get('/', (req, res) => {
  res.send('OTP Service Running');
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
