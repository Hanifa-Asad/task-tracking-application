import "dotenv/config";
import express from "express";
import connectDB from "./db/connectDatabase.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";
import { createServer } from "http";
const app = express();

const secret = process.env.COOKIE_SECRET;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(secret));

app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "http://localhost:5173",
      "https://task-tracking-application-bcgv.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello, Welcome to Vooshfoods" });
});





const handler = async (req, res) => {
  await connectDB();
  return app(req, res); // Express handles the request
};

export default handler;
