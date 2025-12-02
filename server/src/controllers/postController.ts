import { Request, Response } from "express";
import { uploadFileToSupabase, createPostInDB, getAllPostsFromDB, getPostsByUsernameDb } from "../models/postModel";
import {optimizeImage} from "../middleware/optimizeFile"

export async function createPost(req: any, res: any) {
  try {
    const file = req.file;
    const { content, user_id } = req.body;

    let image_url: string | null = null;
    let video_url: string | null = null;

    let fileToUpload: any = file;

    if (file && file.mimetype.startsWith("image/")) {
      const optimized = await optimizeImage(file);
      fileToUpload = { ...file, buffer: optimized };
    }

    if (file) {
      const publicUrl = await uploadFileToSupabase(fileToUpload);
    
      if (file.mimetype.startsWith("image/")) {
        image_url = publicUrl;
      } else if (file.mimetype.startsWith("video/")) {
        video_url = publicUrl;
      }
    }

    const post = await createPostInDB({
      content,
      image_url,
      video_url,
      user_id
    });

    res.status(201).json({ success: true, post });
  } catch (error: any) {
    res.status(500).json({ error: error?.message ?? String(error) });
  }
}

export function getPosts(req: Request, res: Response) {
  getAllPostsFromDB()
    .then((posts) => {
      res.status(200).json({ success: true, posts });
    })
    .catch((error) => {
      res.status(500).json({ error: error?.message ?? String(error) });
    });
}

export async function getPostsByUser(req: Request, res: Response ) {
    const user_id = req.params.userId;

    try{
       const result = await getPostsByUsernameDb(user_id);
       res.status(200).json({success: true, posts: result});
    } catch (error: any){
      res.status(500).json({ error: error?.message ?? String(error) });
    }
}