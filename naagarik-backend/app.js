import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import wardAdminRoutes from "./routes/wardAdmin.routes.js";
import superAdminRoutes from "./routes/superAdmin.routes.js";
import citizenRoutes from "./routes/citizen.routes.js";


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ward-admin", wardAdminRoutes);
app.use("/api/super-admin", superAdminRoutes);
app.use("/api/citizen", citizenRoutes);

app.get("/", (req, res) => {
  res.send("Naagarik API running");
});

export default app;
