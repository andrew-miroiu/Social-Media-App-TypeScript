import {getUserProfileFromDB} from "../models/profileModel";
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