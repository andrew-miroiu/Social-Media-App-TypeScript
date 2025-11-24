import express from "express";
import { createClient } from "@supabase/supabase-js";
import { createConversation } from "../controllers/conversationController";

const router = express.Router();

router.post("/createConversation", createConversation);

export default router;