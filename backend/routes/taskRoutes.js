import express from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  reorderTasks,
} from "../controllers/taskController.js";
// import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Optional: protect all task routes
// router.use(authMiddleware);

// Routes
router.get("/", getTasks);
router.get("/:id", getTaskById); // optional
router.post("/", createTask);
router.put("/reorder", reorderTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
