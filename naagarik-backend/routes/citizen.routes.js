import express from "express";
import {
  getCitizenStats,
  getRecentIssues,
  createComplaint,
} from "../controllers/citizen.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { isCitizen } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(protect, isCitizen);

// Dashboard data
router.get("/stats", getCitizenStats);
router.get("/recent-issues", getRecentIssues);

// Report issue
router.post("/complaints", createComplaint);

export default router;
