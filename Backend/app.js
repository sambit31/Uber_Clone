import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDb from "./db/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";

connectDb();
 
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello');
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error("Server error:", err);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

export default app;