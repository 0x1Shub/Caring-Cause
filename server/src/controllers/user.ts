import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";

export const newUser = async (req:Request, res:Response, next:NextFunction) => {
    try{
        const {} = req.body;
        const user = await User.create({
            
        })
        return res.status(200).json({
            success: true,
            msg: `Welcome ${user.name}`
        })
    } catch(error){

    }
};