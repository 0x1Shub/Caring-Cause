import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";

// middleware to maker sure only admin is allows
export const adminOnly = TryCatch(async (req, res, next) => {
    const {id} = req.query;
    if(!id) return next(new ErrorHandler("Saale Login kar pheele", 401));

    const user = await User.findById(id);
    if(!User) return next(new ErrorHandler("Saale fake id deta hai", 401));
    if(user?.role !== "admin"){
        return next(new ErrorHandler("saale aukat nahi hai teri", 401))
    }
});
