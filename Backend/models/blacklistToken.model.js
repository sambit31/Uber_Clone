import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,  // gvhb: token string is mandatory
        unique: true     // gvhb: ensures the same token cannot be blacklisted twice
    },
    createdAt: {
        type: Date,
        default: Date.now,  // gvhb: set the timestamp when the token is stored
        expires: 86400      // gvhb: MongoDB will automatically delete the record after 86400 seconds (24 hours)
    }
});

// gvhb: Create and export model so you can use it in controllers for logout/token invalidation
const BlacklistToken = mongoose.model("BlacklistToken", blacklistTokenSchema);

export default BlacklistToken;
