import Complaint from "../models/complaint.model.js";
import User from "../models/user.model.js";

/* =========================
   GET COMPLAINTS (WARD ONLY)
========================= */
export const getWardComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      ward: req.user.ward, 
    }).populate("user", "name email");

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   UPDATE COMPLAINT STATUS
========================= */
export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findOne({
      _id: req.params.id,
      ward: req.user.ward, // ✅ extra safety
    });

    if (!complaint)
      return res.status(404).json({ message: "Complaint not found" });

    complaint.status = status;
    await complaint.save();

    res.json({
      message: "Complaint status updated",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   GET USERS (CITIZENS ONLY)
========================= */
export const getWardUsers = async (req, res) => {
  try {
    const users = await User.find({
      ward: req.user.ward,
      role: "Citizen", // ✅ THIS FIXES YOUR ISSUE
    }).select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
