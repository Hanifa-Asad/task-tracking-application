import express from 'express';
import { protect } from '../middleware/auth.mjs';
import { 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask 
} from '../controllers/taskController.mjs';

const router = express.Router();

router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

router.route('/:id')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

export default router;