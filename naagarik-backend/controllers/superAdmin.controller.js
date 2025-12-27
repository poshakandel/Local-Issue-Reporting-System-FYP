import User from "../models/user.model.js";
import Complaint from "../models/complaint.model.js";
import bcrypt from "bcryptjs";

/* USERS */
export const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.json(users);
};

export const getWardAdmins = async (req, res) => {
  const admins = await User.find({ role: "wardAdmin" }).select("-password");
  res.json(admins);
};

export const createUser = async (req, res) => {
  const { name, email, phone, password, ward } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    phone,
    password: hashed,
    ward,
    role: "user",
  });

  res.status(201).json(user);
};

export const createWardAdmin = async (req, res) => {
  const { name, email, phone, password, ward } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  const admin = await User.create({
    name,
    email,
    phone,
    password: hashed,
    ward,
    role: "wardAdmin",
  });

  res.status(201).json(admin);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

export const toggleUserStatus = async (req, res) => {
  const user = await User.findById(req.params.id);
  user.isActive = !user.isActive;
  await user.save();
  res.json(user);
};

export const getComplaintsByWard = async (req, res) => {
  const complaints = await Complaint.find({ ward: req.query.ward });
  res.json(complaints);
};
