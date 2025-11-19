import {getAllUsersDB} from "../models/userModel";
import {Request, Response} from "express";

export async function getAllUsers(req: Request, res: Response){
    try{
        const users = await getAllUsersDB();
        res.status(200).json(users)
    } catch (error : any){
        res.status(500).json({error: error?.message ?? String(error)});
    }
}