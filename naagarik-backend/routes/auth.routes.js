import express from "express";
import {
  loginUser,
  registerCitizen,
  createWardAdmin,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerCitizen);
router.post("/admin/create", createWardAdmin); 

export default router;
