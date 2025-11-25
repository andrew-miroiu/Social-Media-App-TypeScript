import { createConversationDb } from "../models/conversationModel";
import { Request, Response } from "express";

export async function createConversation(req: Request, res: Response) {
    try {
        const {currentUserId, userId} = req.body;

        if(!currentUserId || !userId){
            return  res.status(400).json({error: "missing currentUserId or user_id"});
        }

        const conversation = await createConversationDb(currentUserId, userId);
        res.status(201).json({success: true, conversation});
    } catch (error: any) {
        res.status(500).json({ error: error?.message ?? String(error) });
    }
}