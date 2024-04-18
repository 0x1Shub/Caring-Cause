import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/user.js";

export const newUser = async (req:Request<{}, {}, NewUserRequestBody>, res:Response, next:NextFunction) => {
    try{
        const {name, email, gender, photo, _id, dob} = req.body;
        const user = await User.create({
            name, email, gender, photo, _id, dob:new Date(dob)
        })
        return res.status(201).json({
            success: true,
            msg: `Welcome ${user.name}`
        })
    } catch(error){
        return res.status(400).json({
            success: false,
            msg: error,
        })
    }
};