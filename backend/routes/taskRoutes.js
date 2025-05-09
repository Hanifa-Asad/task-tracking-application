import {
  getTasks,
  getTaskById, 
  createTask,
  updateTask,
  deleteTask,
  reorderTasks,
} from "../controllers/taskController.js";



router.get("/", getTasks);
router.get("/:id", getTaskById); 
router.post("/", createTask);
router.put("/reorder", reorderTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
