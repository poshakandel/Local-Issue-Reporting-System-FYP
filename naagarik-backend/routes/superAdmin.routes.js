import express from "express";
import {
  getAllUsers,
  getWardAdmins,
  createUser,
  createWardAdmin,
  deleteUser,
  toggleUserStatus,
  getComplaintsByWard,
} from "../controllers/superAdmin.controller.js";

import { protect, superAdminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users", protect, superAdminOnly, getAllUsers);
router.get("/ward-admins", protect, superAdminOnly, getWardAdmins);

router.post("/create-user", protect, superAdminOnly, createUser);
router.post("/create-ward-admin", protect, superAdminOnly, createWardAdmin);

router.delete("/users/:id", protect, superAdminOnly, deleteUser);
router.patch("/users/:id/toggle", protect, superAdminOnly, toggleUserStatus);

router.get("/complaints", protect, superAdminOnly, getComplaintsByWard);

export default router;
