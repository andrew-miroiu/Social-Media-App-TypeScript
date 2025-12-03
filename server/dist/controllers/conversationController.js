"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConversation = createConversation;
const conversationModel_1 = require("../models/conversationModel");
async function createConversation(req, res) {
    try {
        const { currentUserId, userId } = req.body;
        if (!currentUserId || !userId) {
            return res.status(400).json({ error: "missing currentUserId or user_id" });
        }
        const conversation = await (0, conversationModel_1.createConversationDb)(currentUserId, userId);
        res.status(201).json({ success: true, conversation });
    }
    catch (error) {
        res.status(500).json({ error: error?.message ?? String(error) });
    }
}
