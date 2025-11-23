import {postCommentDb, getCommentsDb} from "../models/commentsModel";
import { Request, Response } from "express";

export async function postComment(req: Request, res: Response) {
    try {
        const {post_id, user_id, content} = req.body;

        if(!post_id || !user_id || !content){
            return  res.status(400).json({error: "missing post_id, user_id or content"});
        }

        const comment = await postCommentDb(post_id, user_id, content);

        res.status(201).json({success: true, comment});
    } catch (error: any) {
        res.status(500).json({ error: error?.message ?? String(error) });
    }
}

export async function getComments(req: Request, res: Response){
    try{
        const post_id= req.params.post_id;

        if(!post_id){
            return res.status(400).json({error: "missing post_id"});
        }

        const comments = await getCommentsDb(post_id);
        console.log("comments: ", comments)
        res.status(201).json({success: true, comments});
    } catch (error : any){
        res.status(500).json({ error: error?.message ?? String(error) });
    }
}