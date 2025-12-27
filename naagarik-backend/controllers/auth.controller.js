import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

/* =========================
   LOGIN USER
========================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isActive)
      return res.status(403).json({ message: "Account is deactivated" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   REGISTER CITIZEN (PUBLIC)
========================= */
export const registerCitizen = async (req, res) => {
  try {
    const { name, email, phone, password, ward } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    if (ward && (ward < 1 || ward > 33))
      return res.status(400).json({ message: "Invalid ward number" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "Citizen",
      ward,
    });

    res.status(201).json({
      message: "Citizen registered successfully",
      userId: newUser._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   CREATE WARD ADMIN (SUPER ADMIN)
========================= */
export const createWardAdmin = async (req, res) => {
  try {
    const { name, email, phone, password, ward } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    if (!ward || ward < 1 || ward > 33)
      return res.status(400).json({ message: "Invalid ward number" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "WardAdmin",
      ward,
    });

    res.status(201).json({
      message: "Ward Admin created successfully",
      adminId: admin._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
