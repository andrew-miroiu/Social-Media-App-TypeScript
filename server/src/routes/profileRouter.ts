import express from "express";
import { getUserProfile } from "../controllers/profileController";

const router = express.Router();

router.get("/:id", getUserProfile);

export default router;