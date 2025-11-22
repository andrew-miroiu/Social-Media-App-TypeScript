import express from "express"
import { createClient } from "@supabase/supabase-js"
import { toggleLike , numberOflikes, likedPost} from "../controllers/likeController"

const router = express.Router();

router.get("/numberOflikes/:post_id", numberOflikes);
router.post("/toggleLike", toggleLike);
router.get("/userLiked/:post_id/:user_id", likedPost);

export default router;