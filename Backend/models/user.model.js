import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: [true, "First name is required"],
            minlength: [3, "First name must be at least 3 characters long"],      
        },
        lastname: {
            type: String,
            required: [true, "Last name is required"],
            minlength: [3, "Last name must be at least 3 characters long"],      
        }
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false  // hide password by default
    },
    socketId: {
        type: String,
    },
});

// ✅ Generate JWT
userSchema.methods.generateAuthToken = function() {
    return jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

// ✅ Compare passwords
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);    
};

// ✅ Hash password
userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
