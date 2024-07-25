import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getTask,
  updateTask,
  updateTaskProgress,
} from "../controllers/Task.controller.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";

const router = Router();

router.route("/create-task").post(verifyJWT, createTask);
router.route("/delete-task").delete(verifyJWT, deleteTask);
router.route("/get-task").post(verifyJWT, getAllTask);
router.route("/task/:taskId").post(verifyJWT, getTask);
router.route("/update-task").patch(verifyJWT, updateTask);
router.route("/update-progress").patch(verifyJWT, updateTaskProgress);

export default router;
