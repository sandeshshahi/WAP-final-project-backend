import express from "express";
import { getProfile, login, register } from "../controllers/auth.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", login);
router.get("/", authMiddleware, getProfile);
router.post("/register", register);

export default router;
