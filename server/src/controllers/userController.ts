import {getAllUsersDB} from "../models/userModel";
import {Request, Response} from "express";

export async function getAllUsers(req: Request, res: Response){
    try{
        const currentUserId = req.params.id;
        const users = await getAllUsersDB(currentUserId);
        res.status(200).json(users)
    } catch (error : any){
        res.status(500).json({error: error?.message ?? String(error)});
    }
}