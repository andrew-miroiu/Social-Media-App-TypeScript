"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = getUserProfile;
exports.updateProfilePicture = updateProfilePicture;
exports.getProfilePicture = getProfilePicture;
const profileModel_1 = require("../models/profileModel");
const optimizeFile_1 = require("../middleware/optimizeFile");
async function getUserProfile(req, res) {
    try {
        const userId = req.params.id;
        const profile = await (0, profileModel_1.getUserProfileFromDB)(userId);
        res.status(200).json({ success: true, profile });
    }
    catch (error) {
        res.status(500).json({ error: error?.message ?? String(error) });
    }
}
async function updateProfilePicture(req, res) {
    try {
        const file = req.file;
        const userId = req.body.userId;
        let fileToUpload = file;
        if (file && file.mimetype.startsWith("image/")) {
            const optimized = await (0, optimizeFile_1.optimizeImage)(file);
            fileToUpload = { ...file, buffer: optimized };
        }
        if (file) {
            const publicUrl = await (0, profileModel_1.uploadProfilePictureToSupabase)(fileToUpload, userId);
            res.status(200).json({ success: true, publicUrl });
        }
    }
    catch (error) {
        res.status(500).json({ error: error?.message ?? String(error) });
    }
}
async function getProfilePicture(req, res) {
    try {
        const userId = req.params.userId;
        const url = await (0, profileModel_1.getUserProfilePictureDb)(userId);
        res.status(200).json({ success: true, url });
    }
    catch (error) {
        res.status(500).json({ error: error?.message ?? String(error) });
    }
}
