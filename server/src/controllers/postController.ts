import { Request, Response } from "express";
import { uploadFileToSupabase, createPostInDB, getAllPostsFromDB } from "../models/postModel";

export async function createPost(req: any, res: any) {
  try {
    const file = req.file;
    const { content, user_id } = req.body;

    let image_url: string | null = null;
    let video_url: string | null = null;

    if (file) {
      const publicUrl = await uploadFileToSupabase(file);

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
