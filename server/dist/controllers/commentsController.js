"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postComment = postComment;
exports.getComments = getComments;
const commentsModel_1 = require("../models/commentsModel");
async function postComment(req, res) {
    try {
        const { post_id, user_id, content } = req.body;
        if (!post_id || !user_id || !content) {
            return res.status(400).json({ error: "missing post_id, user_id or content" });
        }
        const comment = await (0, commentsModel_1.postCommentDb)(post_id, user_id, content);
        res.status(201).json({ success: true, comment });
    }
    catch (error) {
        res.status(500).json({ error: error?.message ?? String(error) });
    }
}
async function getComments(req, res) {
    try {
        const post_id = req.params.post_id;
        if (!post_id) {
            return res.status(400).json({ error: "missing post_id" });
        }
        const comments = await (0, commentsModel_1.getCommentsDb)(post_id);
        const numberOfComments = comments.length;
        res.status(201).json({ success: true, comments, numberOfComments: numberOfComments });
    }
    catch (error) {
        res.status(500).json({ error: error?.message ?? String(error) });
    }
}
