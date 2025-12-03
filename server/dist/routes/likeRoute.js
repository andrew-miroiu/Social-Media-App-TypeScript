"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const likeController_1 = require("../controllers/likeController");
const router = express_1.default.Router();
router.get("/numberOflikes/:post_id", likeController_1.numberOflikes);
router.post("/toggleLike", likeController_1.toggleLike);
router.get("/userLiked/:post_id/:user_id", likeController_1.likedPost);
exports.default = router;
