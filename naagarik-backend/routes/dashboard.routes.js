import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";
import {
  getCitizenDashboard,
  getWardAdminDashboard,
  getSuperAdminDashboard,
   createWardAdmin 
} from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/citizen", protect, allowRoles("Citizen"), getCitizenDashboard);

router.get("/ward-admin", protect, allowRoles("Ward Admin"), getWardAdminDashboard);

router.get("/super-admin", protect, allowRoles("Super Admin"), getSuperAdminDashboard);

router.post("/super-admin/create-ward-admin", protect, allowRoles("Super Admin"), createWardAdmin);

export default router;
