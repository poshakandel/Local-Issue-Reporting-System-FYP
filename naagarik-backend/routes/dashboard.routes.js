import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";
import {
  getCitizenDashboard,
  getWardAdminDashboard,
  getSuperAdminDashboard,
  createWardAdmin,
  getWardAdmins
} from "../controllers/dashboard.controller.js";

const router = express.Router();

// Citizen Dashboard
router.get("/citizen", protect, allowRoles("Citizen"), getCitizenDashboard);

// Ward Admin Dashboard
router.get("/ward-admin", protect, allowRoles("Ward Admin"), getWardAdminDashboard);

// Super Admin Dashboard
router.get("/super-admin", protect, allowRoles("Super Admin"), getSuperAdminDashboard);

// Create Ward Admin
router.post("/super-admin/create-ward-admin", protect, allowRoles("Super Admin"), createWardAdmin);

// Get all Ward Admins (for dashboard list)
router.get("/ward-admins", protect, allowRoles("Super Admin"), getWardAdmins);

export default router;
