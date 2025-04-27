import express from "express";
import userRoutes from "./userRoute.mjs";
import taskRoutes from "./taskRoute.mjs";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/task", taskRoutes);

export default router;
