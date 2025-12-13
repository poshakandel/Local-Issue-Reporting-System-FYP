import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";

const router = express.Router();

/* Citizen dashboard */
router.get(
  "/citizen",
  protect,
  allowRoles("Citizen"),
  (req, res) => {
    res.json({ message: "Citizen dashboard" });
  }
);

/* Ward Admin dashboard */
router.get(
  "/ward-admin",
  protect,
  allowRoles("Ward Admin"),
  (req, res) => {
    res.json({ message: "Ward Admin dashboard" });
  }
);

/* Super Admin dashboard */
router.get(
  "/super-admin",
  protect,
  allowRoles("Super Admin"),
  (req, res) => {
    res.json({ message: "Super Admin dashboard" });
  }
);

export default router;
