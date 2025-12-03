"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = sendMessage;
exports.getMessages = getMessages;
const messageModel_1 = require("../models/messageModel");
async function sendMessage(req, res) {
    try {
        const { conversation_id, sender_id, content } = req.body;
        if (!conversation_id || !sender_id || !content) {
            return res.status(400).json({ error: "missing conversation_id, sender_id or content" });
        }
        const result = await (0, messageModel_1.sendMessageDb)(conversation_id, sender_id, content);
        console.log(conversation_id, sender_id, content);
        res.status(201).json({ success: true, result });
    }
    catch (error) {
        res.status(500).json({ error: error?.message ?? String(error) });
    }
}
async function getMessages(req, res) {
    try {
        const conversation_id = req.params.conversation_id;
        if (!conversation_id) {
            return res.status(400).json({ error: "missing convesation_id " });
        }
        console.log("conversation_id: ", conversation_id);
        const messages = await (0, messageModel_1.getMessagesDb)(conversation_id);
        console.log("mesaje: ", messages);
        res.status(201).json({ success: true, messages });
    }
    catch (error) {
        res.status(500).json({ error: error?.message ?? String(error) });
    }
}
