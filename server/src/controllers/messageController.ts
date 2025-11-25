import { Request, Response } from "express";
import {sendMessageDb, getMessagesDb} from "../models/messageModel"

export async function sendMessage(req: Request, res: Response) {
    try{
        const {conversation_id, sender_id, content} = req.body
        
        if(!conversation_id || !sender_id || !content){
            return  res.status(400).json({error: "missing conversation_id, sender_id or content"});
        }

        const result = await sendMessageDb(conversation_id, sender_id, content);
        console.log(conversation_id, sender_id, content);
        res.status(201).json({success: true, result});
    } catch(error: any){
        res.status(500).json({ error: error?.message ?? String(error) });
    }
}

export async function getMessages(req: Request, res: Response) {
    try {
        const conversation_id = req.params.conversation_id;

        if(!conversation_id){
            return res.status(400).json({error: "missing convesation_id "})
        }
        console.log("conversation_id: ", conversation_id);
        const messages = await getMessagesDb(conversation_id);
        console.log("mesaje: ", messages);
        res.status(201).json({success: true, messages})
    } catch (error: any) {
        res.status(500).json({ error: error?.message ?? String(error) });
    }
    
}