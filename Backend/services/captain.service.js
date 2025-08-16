import CaptainModel from "../models/captain.model.js";

export const createCaptain = async (fullname, email, password, vehicle) => {
  if (!fullname?.firstname || !fullname?.lastname || !email || !password || !vehicle?.color || !vehicle?.plate || !vehicle?.capacity || !vehicle?.vehicleType) {
    throw new Error("All fields are required");
  }

  const captain = new CaptainModel({
    fullname,
    email,
    password, // password will be hashed by pre-save hook
    vehicle
  });

  await captain.save();
  return captain;
};
