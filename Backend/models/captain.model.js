import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: { type: String, required: true, minlength: [3, "First name must be at least 3 characters long"] },
      lastname: { type: String, required: true, minlength: [3, "Last name must be at least 3 characters long"] }
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please enter a valid email"]
    },
    password: { type: String, required: true, select: false },
    socketId: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "inactive" },
    vehicle: {
      color: { type: String, required: true, minlength: [3, "Color must be at least 3 characters long"] },
      plate: { type: String, required: true, minlength: [3, "Plate must be at least 3 characters long"] },
      capacity: { type: Number, required: true, min: [1, "Capacity must be at least 1"] },
      vehicleType: { type: String, required: true, enum: ["car", "motorcycle", "auto"] }
    },
    location: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  { timestamps: true }
);

// Hash password before save
captainSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

captainSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

captainSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const CaptainModel = mongoose.model("Captain", captainSchema);
export default CaptainModel;
