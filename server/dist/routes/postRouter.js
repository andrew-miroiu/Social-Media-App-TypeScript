"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const upload_1 = __importDefault(require("../middleware/upload"));
const router = express_1.default.Router();
// mounted at /posts in server/src/index.ts
router.get("/user/:userId", postController_1.getPostsByUser);
router.get("/", postController_1.getPosts);
router.post("/", upload_1.default.single("file"), postController_1.createPost);
exports.default = router;
