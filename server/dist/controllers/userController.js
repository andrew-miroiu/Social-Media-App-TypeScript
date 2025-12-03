"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = getAllUsers;
const userModel_1 = require("../models/userModel");
async function getAllUsers(req, res) {
    try {
        const currentUserId = req.params.id;
        const users = await (0, userModel_1.getAllUsersDB)(currentUserId);
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: error?.message ?? String(error) });
    }
}
