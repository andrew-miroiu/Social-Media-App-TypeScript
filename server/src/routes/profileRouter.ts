import express from "express";
import upload from "../middleware/uploadProfilePicture"
import { getUserProfile , updateProfilePicture, getProfilePicture} from "../controllers/profileController";

const router = express.Router();

router.put("/updateProfilePicture", upload.single("avatar"), updateProfilePicture);
router.get("/:userId/getProfilePicture", getProfilePicture);
router.get("/:id", getUserProfile);

export default router;