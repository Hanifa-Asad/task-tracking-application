import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.mjs';
import authRoutes from './routes/authRoutes.mjs';
import taskRoutes from './routes/taskRoutes.mjs';
import cors from 'cors';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', authRoutes);
app.use('/api/tasks', taskRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});