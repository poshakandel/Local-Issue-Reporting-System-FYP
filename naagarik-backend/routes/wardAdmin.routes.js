import express from "express";
import {
  getWardComplaints,
  updateComplaintStatus,
  getWardUsers,
} from "../controllers/wardAdmin.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { isWardAdmin } from "../middleware/role.middleware.js";

const router = express.Router();

// All routes below require login + ward admin role
router.use(protect, isWardAdmin);

// Complaints of this ward
router.get("/complaints", getWardComplaints);

// Update complaint status
router.patch("/complaints/:id/status", updateComplaintStatus);

// Citizens of this ward ONLY
router.get("/users", getWardUsers);

export default router;
