import Complaint from "../models/complaint.model.js";

/**
 * GET DASHBOARD STATS
 */
export const getCitizenStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const total = await Complaint.countDocuments({ createdBy: userId });
    const pending = await Complaint.countDocuments({
      createdBy: userId,
      status: "Pending",
    });
    const resolved = await Complaint.countDocuments({
      createdBy: userId,
      status: "Resolved",
    });

    res.json({
      totalIssues: total,
      pendingIssues: pending,
      resolvedIssues: resolved,
      reportedIssues: total,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to load stats" });
  }
};

/**
 * GET RECENT ISSUES (Citizen)
 */
export const getRecentIssues = async (req, res) => {
  try {
    const issues = await Complaint.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 })
      .limit(6);

    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: "Failed to load recent issues" });
  }
};

/**
 * CREATE NEW ISSUE
 */
export const createComplaint = async (req, res) => {
  try {
    const { title, description } = req.body;

    const complaint = await Complaint.create({
      title,
      description,
      createdBy: req.user._id,
      ward: req.user.ward,
    });

    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Failed to create complaint" });
  }
};
