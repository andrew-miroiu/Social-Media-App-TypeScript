import express from "express";
import { createClient } from "@supabase/supabase-js";
import { createConversation } from "../controllers/conversationController";

const router = express.Router();

router.post("/sendMessage", createConversation);
router.get("/getMessages/:conversation_id" , getMessages)

export default router;