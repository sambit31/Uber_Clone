import express from "express";
import { body } from "express-validator";
import { registerCaptain } from "../controllers/captain.controllers.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("fullname.firstname")
      .trim()
      .notEmpty()
      .withMessage("First name is required")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("fullname.lastname")
      .trim()
      .notEmpty()
      .withMessage("Last name is required")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("vehicle.color").trim().notEmpty().withMessage("Vehicle color is required"),
    body("vehicle.plate").trim().notEmpty().withMessage("Vehicle plate is required"),
    body("vehicle.capacity").isNumeric().withMessage("Vehicle capacity must be a number"),
    body("vehicle.vehicleType").isIn(["car", "motorcycle", "auto"]).withMessage("Invalid vehicle type")
  ],
  registerCaptain
);

export default router;
