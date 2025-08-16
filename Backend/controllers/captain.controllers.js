import { validationResult } from "express-validator";
import CaptainModel from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";

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
