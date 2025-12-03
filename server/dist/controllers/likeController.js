"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleLike = toggleLike;
exports.numberOflikes = numberOflikes;
exports.likedPost = likedPost;
const likeModel_1 = require("../models/likeModel");
async function toggleLike(req, res) {
    try {
        const { post_id, user_id, isLiked } = req.body;
        if (!post_id || !user_id) {
            return res.status(400).json({ error: "missing postid or userid" });
        }
        if (isLiked) {
            await (0, likeModel_1.removeLikeDb)(post_id, user_id);
            res.status(200).json({ liked: false });
        }
        else {
            await (0, likeModel_1.addLikeDb)(post_id, user_id);
            res.status(200).json({ liked: true });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function numberOflikes(req, res) {
    try {
        const post_id = req.params.post_id;
        if (!post_id) {
            return res.status(400).json({ error: "missing userid" });
        }
        const numberOflikes = await (0, likeModel_1.getLikesForPost)(post_id);
        res.status(200).json({ numberOflikes: numberOflikes });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function likedPost(req, res) {
    try {
        const { post_id, user_id } = req.params;
        const alreadyLikedPost = await (0, likeModel_1.userLikedPost)(post_id, user_id);
        if (alreadyLikedPost) {
            res.status(200).json({ liked: true });
        }
        else {
            res.status(200).json({ liked: false });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
