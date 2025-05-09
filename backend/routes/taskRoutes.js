import {
  getTasks,
  getTaskById, 
  createTask,
  updateTask,
  deleteTask,
  reorderTasks,
} from "../controllers/taskController.js";
const router = express.Router();
// router.use(authMiddleware);

router.get("/", getTasks);
router.get("/:id", getTaskById); 
router.post("/", createTask);
router.put("/reorder", reorderTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
