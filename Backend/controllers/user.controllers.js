import BlacklistToken from "../models/blacklistToken.model.js";
import userModel from "../models/user.model.js";
import userService from "../services/user.service.js";
import { validationResult } from "express-validator";


// ✅ Register User
export const registerUser = async (req, res) => {
    try {
        // Check validation errors from express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { fullname, email, password } = req.body;

        // Check required fields
        if (!fullname?.firstname || !fullname?.lastname || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Firstname, lastname, email, and password are required." 
            });
        }

        // Hash password
        const hashedPassword = await userModel.hashPassword(password);

        // Save user
        const user = await userService.createUser({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname
            },
            email,
            password: hashedPassword
        });

        // Generate token
        const token = user.generateAuthToken();

        // Return response
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                _id: user._id,
                email: user.email,
                fullname: user.fullname
            },
            token
        });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Registration failed"
        });
    }
};

// ✅ Login User
export const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { email, password } = req.body;

        // Find user and include password field
        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        // Generate token
        const token = user.generateAuthToken();

        res.cookie('token',token);

        // Remove password from user object
        const userObj = user.toObject();
        delete userObj.password;

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: userObj
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: error.message || "Login failed" });
    }
};

//
export const getUserProfile =async(req,res)=>{
    res.status(200).json(req.user);
};

export const logoutUser = async (req, res) => {
    try {
        // Get token from cookie or Authorization header
        const token = req.cookies.token ||
            (req.headers.authorization && req.headers.authorization.split(' ')[1]);

        if (!token) {
            return res.status(400).json({ message: 'No token provided' });
        }

        // Blacklist the token
        await BlacklistToken.create({ token });

        // Clear the cookie after reading it
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out' });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: error.message || 'Logout failed' });
    }
}