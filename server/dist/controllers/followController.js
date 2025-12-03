"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.follow = follow;
exports.unfollow = unfollow;
const followModel_1 = require("../models/followModel");
async function follow(req, res) {
    try {
        const { follower_id, following_id } = req.body;
        if (!follower_id || !following_id) {
            return res.status(400).json({ error: "Missing follower_id or following_id" });
        }
        const result = await (0, followModel_1.followDb)(follower_id, following_id);
        res.status(200).json({ success: true, follow: result });
    }
    catch (error) {
        res.status(500).json({ error: error?.message || "Server error" });
    }
}
async function unfollow(req, res) {
    try {
        const { follower_id, following_id } = req.body;
        if (!follower_id || !following_id) {
            return res.status(400).json({ error: "Missing follower_id or following_id" });
        }
        const result = await (0, followModel_1.unfollowDb)(follower_id, following_id);
        res.status(200).json({ success: true, follow: result });
    }
    catch (error) {
        res.status(500).json({ error: error?.message || "Server error" });
    }
}
