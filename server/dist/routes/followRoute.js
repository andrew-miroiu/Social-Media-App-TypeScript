"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const followController_1 = require("../controllers/followController");
const router = express_1.default.Router();
router.post("/follow", followController_1.follow);
router.delete("/unfollow", followController_1.unfollow);
exports.default = router;
