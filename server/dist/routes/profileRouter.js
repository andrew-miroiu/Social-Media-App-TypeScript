"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadProfilePicture_1 = __importDefault(require("../middleware/uploadProfilePicture"));
const profileController_1 = require("../controllers/profileController");
const router = express_1.default.Router();
router.put("/updateProfilePicture", uploadProfilePicture_1.default.single("avatar"), profileController_1.updateProfilePicture);
router.get("/:userId/getProfilePicture", profileController_1.getProfilePicture);
router.get("/:id", profileController_1.getUserProfile);
exports.default = router;
