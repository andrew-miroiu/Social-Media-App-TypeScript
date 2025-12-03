"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = require("../controllers/messageController");
const router = express_1.default.Router();
router.post("/sendMessage", messageController_1.sendMessage);
router.get("/getMessages/:conversation_id", messageController_1.getMessages);
exports.default = router;
