"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentsController_1 = require("../controllers/commentsController");
const router = express_1.default.Router();
router.post("/postComment", commentsController_1.postComment);
router.get("/getComments/:post_id", commentsController_1.getComments);
exports.default = router;
