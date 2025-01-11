import express from "express";
const router = express.Router();
import Skill from "../Models/skills.js";
// Routes
// Create a new skill
router.post("/upload_skills", async (req, res) => {
  try {
    const { jobPostId, mainSkills, subSkills, depthOfRound } = req.body;

    // Simple validation
    if (!mainSkills) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      });
    }

    const Skills = new Skill({
      jobPostId,
      mainSkills,
      subSkills,
      depthOfRound,
    });

    const savedSkills = await Skills.save();

    res.status(201).json({
      success: true,
      message: "Job post created successfully",
      job: savedSkills,
    });
  } catch (error) {
    console.error("Error creating job post:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});
// Get all skills
router.get("/skills", async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a skill
router.put("/skills/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const skill = await Skill.findByIdAndUpdate(id, updates, { new: true });
    res.json(skill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a skill
router.delete("/skills/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Skill.findByIdAndDelete(id);
    res.json({ message: "Skill deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a round
router.post("/rounds", async (req, res) => {
  try {
    const { depth, duration, goal } = req.body;
    const round = new Round({ depth, duration, goal });
    await round.save();
    res.status(201).json(round);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all rounds
router.get("/rounds", async (req, res) => {
  try {
    const rounds = await Round.find();
    res.json(rounds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a round
router.put("/rounds/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const round = await Round.findByIdAndUpdate(id, updates, { new: true });
    res.json(round);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a round
router.delete("/rounds/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Round.findByIdAndDelete(id);
    res.json({ message: "Round deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
