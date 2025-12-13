import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REGISTER CITIZEN
export const registerCitizen = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "Citizen",
    });

    res.status(201).json({ message: "Citizen registered successfully", userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE WARD ADMIN (ONLY SUPER ADMIN CAN DO)
export const createWardAdmin = async (req, res) => {
  try {
    const { name, email, phone, password, ward } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "Ward Admin",
      ward,
    });

    res.status(201).json({ message: "Ward Admin created successfully", adminId: newAdmin._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
