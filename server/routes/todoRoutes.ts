import express from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController";
import { protect } from "../middleware/validateToken";

const router = express.Router();

router.use(protect);

router.route("/").get(getTodos);
router.route("/").post(createTodo);
router.route("/:id").put(updateTodo);
router.route("/:id").delete(deleteTodo);

export default router;
