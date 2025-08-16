import { validationResult } from "express-validator";
import CaptainModel from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import BlacklistToken from "../models/blacklistToken.model.js";

export const registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  try {
    const isCaptainExists = await CaptainModel.findOne({ email });
    if (isCaptainExists) {
      return res.status(400).json({ error: "Captain already exists" });
    }

    const captain = await createCaptain(fullname, email, password, vehicle);
    const token = captain.generateAuthToken();

    const { password: _pw, ...captainObj } = captain.toObject();

    return res.status(201).json({ captain: captainObj, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


export const loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const captain = await CaptainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

  const token = captain.generateAuthToken();

  res.cookie('token', token);

  return res.status(200).json({ captain, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

};

export const getCaptainProfile = (req, res) => {
  return res.status(200).json({ captain: req.captain });
};

export const logoutCaptain = async (req, res) => {
    const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];
    await BlacklistToken.create({ token });
    res.clearCookie("token");
  return res.status(200).json({ message: "Logged out successfully" });
};
