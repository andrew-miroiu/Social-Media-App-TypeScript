"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = createPost;
exports.getPosts = getPosts;
exports.getPostsByUser = getPostsByUser;
const postModel_1 = require("../models/postModel");
const optimizeFile_1 = require("../middleware/optimizeFile");
async function createPost(req, res) {
    try {
        const file = req.file;
        const { content, user_id } = req.body;
        let image_url = null;
        let video_url = null;
        let fileToUpload = file;
        if (file && file.mimetype.startsWith("image/")) {
            const optimized = await (0, optimizeFile_1.optimizeImage)(file);
            fileToUpload = { ...file, buffer: optimized };
        }
        if (file) {
            const publicUrl = await (0, postModel_1.uploadFileToSupabase)(fileToUpload);
            if (file.mimetype.startsWith("image/")) {
                image_url = publicUrl;
            }
            else if (file.mimetype.startsWith("video/")) {
                video_url = publicUrl;
            }
        }
        const post = await (0, postModel_1.createPostInDB)({
            content,
            image_url,
            video_url,
            user_id
        });
        res.status(201).json({ success: true, post });
    }
    catch (error) {
        res.status(500).json({ error: error?.message ?? String(error) });
    }
}
function getPosts(req, res) {
    (0, postModel_1.getAllPostsFromDB)()
        .then((posts) => {
        res.status(200).json({ success: true, posts });
    })
        .catch((error) => {
        res.status(500).json({ error: error?.message ?? String(error) });
    });
}
async function getPostsByUser(req, res) {
    const user_id = req.params.userId;
    try {
        const result = await (0, postModel_1.getPostsByUsernameDb)(user_id);
        res.status(200).json({ success: true, posts: result });
    }
    catch (error) {
        res.status(500).json({ error: error?.message ?? String(error) });
    }
}
