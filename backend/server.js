import "dotenv/config";
import express from "express";
import connectDB from "./db/connectDatabase.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

const PORT = process.env.PORT || 4000;
const secret = process.env.COOKIE_SECRET;
const frontendBaseURL = process.env.FRONTEND_BASE_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(secret));




app.use(
  cors({
  	origin: ['http://localhost:5174',
      'http://localhost:5173',
     'https://task-tracking-application-bcgv.vercel.app',
     
     ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], 
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello, Welocome To Vooshfoods" });
});

app.listen(PORT, () => {
  connectDB()
    .then(() => console.log(`Server started on PORT: ${PORT}`))
    .catch((error) => {
      console.error('Failed to connect to DB', error);
      process.exit(1); // Force exit the app
    });
});

