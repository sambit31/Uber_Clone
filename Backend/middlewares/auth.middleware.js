import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

// middleware to protect routes
const authUser = async (req,res,next)=> {
    // Try token from cookies OR Authorization header
    const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({message:'Unauthorized'});

    const isblacklisted = await userModel.findOne({token:token});
    if(isblacklisted) return res.status(401).json({message:'Unauthorized'});

    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id).select("-password"); // exclude password
        if(!user) return res.status(404).json({message:'User not found'});
        
        req.user = user; // attach user to request
        next(); // continue to controller
    } catch (error) {
        return res.status(401).json({message:'Unauthorized'});
    }
};

export default authUser;
