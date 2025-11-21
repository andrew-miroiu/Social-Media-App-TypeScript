import {followDb, unfollowDb} from "../models/followModel";
import {Request, Response} from "express";

export async function follow(req: Request, res: Response) {
  try {
    const { follower_id, following_id } = req.body;

    if (!follower_id || !following_id) {
      return res.status(400).json({ error: "Missing follower_id or following_id" });
    }
    const result = await followDb(follower_id, following_id);

    res.status(200).json({ success: true, follow: result });

  } catch (error: any) {
    res.status(500).json({ error: error?.message || "Server error" });
  }
}

export async function unfollow(req: Request, res: Response) {
    try{
        const {follower_id, following_id} = req.body;
    
        if (!follower_id || !following_id) {
        return res.status(400).json({ error: "Missing follower_id or following_id" });
        }

        const result = await unfollowDb(follower_id, following_id);

        res.status(200).json({success: true, follow: result})
    } catch (error : any){
        res.status(500).json({ error: error?.message || "Server error" });
    }
}
