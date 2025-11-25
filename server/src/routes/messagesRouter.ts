import express from "express";
import { createClient } from "@supabase/supabase-js";
import { sendMessage, getMessages } from "../controllers/messageController";

const router = express.Router();

router.post("/sendMessage", sendMessage);
router.get("/getMessages/:conversation_id" , getMessages)

export default router;