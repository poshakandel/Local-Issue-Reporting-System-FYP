import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

// Citizen Dashboard
export const getCitizenDashboard = (req, res) => {
  res.json({ message: "Citizen dashboard" });
};

// Ward Admin Dashboard
export const getWardAdminDashboard = (req, res) => {
  res.json({ message: "Ward Admin dashboard" });
};

// Super Admin Dashboard
export const getSuperAdminDashboard = (req, res) => {
  res.json({ message: "Super Admin dashboard" });
};

// Create Ward Admin (for Super Admin)
export const createWardAdmin = async (req, res) => {
  try {
    const { name, email, phone, password, ward } = req.body;

    if (!name || !email || !phone || !password || !ward) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const wardAdmin = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "Ward Admin",
      ward,
    });

    res.status(201).json({
      message: "Ward Admin created successfully",
      wardAdmin: {
        id: wardAdmin._id,
        name: wardAdmin.name,
        email: wardAdmin.email,
        ward: wardAdmin.ward,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
