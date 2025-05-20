import express from "express";
import { submitForm } from "../controllers/formController";

const router = express.Router();

router.post("/submit", submitForm);

export default router;