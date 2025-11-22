import { error } from "console";
import {addLikeDb, removeLikeDb, userLikedPost, getLikesForPost} from "../models/likeModel"
import {Request, Response} from "express";

export async function toggleLike(req: Request, res: Response) {
    try{
        const  {post_id, user_id, isLiked} = req.body;


        if(!post_id || !user_id){
            return res.status(400).json({error: "missing postid or userid"});
        }

        if(isLiked){
            await removeLikeDb(post_id, user_id);
            res.status(200).json({liked: false});
        }
        else{
            await addLikeDb(post_id, user_id);
            res.status(200).json({liked: true});
        }
    } catch (error: any){
        res.status(500).json({ error: error.message });
    }
}

export async function numberOflikes(req: Request, res: Response) {
    try{
        const post_id = req.params.post_id;

        if(!post_id){
            return res.status(400).json({error: "missing userid"});
        }

        const numberOflikes = await getLikesForPost(post_id);

        res.status(200).json({numberOflikes: numberOflikes});
    } catch (error: any){
        res.status(500).json({ error: error.message });
    }
}

export async function likedPost(req: Request, res: Response) {
    try{
        const {post_id, user_id} = req.params
        const alreadyLikedPost = await userLikedPost(post_id, user_id);

        if(alreadyLikedPost){
            res.status(200).json({liked: true});
        }
        else{
            res.status(200).json({liked: false});
        }

    } catch(error : any){
        res.status(500).json({ error: error.message });
    }
}