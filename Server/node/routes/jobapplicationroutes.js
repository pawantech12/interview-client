// routes/jobRoutes.js
import express from "express";
import { applyToJob } from "../controllers/jobapplicationcontroller";

const router = express.Router();

// Route for applying to a job
router.post("/:jobId/apply", applyToJob);

export default router;
