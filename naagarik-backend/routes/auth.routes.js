import express from "express";
import { loginUser, registerCitizen, createWardAdmin } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";     
import { allowRoles } from "../middleware/role.middleware.js";   

const router = express.Router();

// Routes
router.post("/register", registerCitizen); 
router.post("/login", loginUser);      
router.post("/admin/create", protect, allowRoles("Super Admin"), createWardAdmin); 

export default router;
