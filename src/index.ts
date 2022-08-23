import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import authRouter from './routers/authRouter'

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const DB_URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.MONGODB_URL}/?retryWrites=true&w=majority`;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', authRouter)

app.get("/", (req, res) => {
  res.send("APP IS RUNNING");
});

const start = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    app.listen(PORT, () => {
      console.log(`Server starts at PORT: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
