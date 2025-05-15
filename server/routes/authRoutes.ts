import express from "express";
import { register, login, logout } from "../controllers/authController";

const router = express.Router();

router.post("/signup", register);
router.post("/signin", login);
router.post("/logout", logout);

export default router;
