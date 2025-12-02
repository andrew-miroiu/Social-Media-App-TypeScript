import {getUserProfileFromDB, uploadProfilePictureToSupabase, getUserProfilePictureDb} from "../models/profileModel";
import {Request, Response} from "express";

export async function getUserProfile(req: Request, res: Response) {
    try {
        const userId = req.params.id;
        const profile = await getUserProfileFromDB(userId);
        res.status(200).json({success: true, profile});
    } catch (error: any) {
        res.status(500).json({error: error?.message ?? String(error)});
    }
}

export async function updateProfilePicture(req: Request, res: Response) {
    try{
        const file = req.file;
        const userId = req.body.userId;

        if (file) {
            const publicUrl = await uploadProfilePictureToSupabase(file, userId);
            res.status(200).json({success: true, publicUrl});
        }
    } catch (error: any) {
        res.status(500).json({error: error?.message ?? String(error)});
    }
}

export async function getProfilePicture(req: Request, res: Response) {
    try{
        const userId = req.params.userId;
        const url = await getUserProfilePictureDb(userId);
        res.status(200).json({success:true, url});
    } catch (error : any){
        res.status(500).json({error: error?.message ?? String(error)});
    }
}