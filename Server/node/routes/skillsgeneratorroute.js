import express from "express";
import { spawn } from "child_process";
const router = express.Router();

router.post("/generate-skills", async (req, res) => {
  const { jobTitle, description, totalSkills } = req.body;

  const pythonProcess = spawn("python", [
    "D:\\Aspierit - Internship Project\\ai_interviewer-main\\Server\\skill-generator.py",
    jobTitle,
    description,
    totalSkills,
  ]);

  let result = "";
  let isResponseSent = false;
  const timeout = setTimeout(() => {
    pythonProcess.kill(); // Kill the process if it takes too long
    if (!isResponseSent) {
      isResponseSent = true;
      res.status(500).json({ error: "Python script timeout exceeded." });
    }
  }, 60000); // Set a 60 seconds timeout (adjust as needed)

  pythonProcess.stdout.on("data", (data) => {
    console.log("Python output:", data.toString());
    result += data.toString();
  });

  pythonProcess.stderr.on("data", (error) => {
    console.error("Error:", error.toString());
    if (!isResponseSent) {
      isResponseSent = true;
      res.status(500).json({ error: "Error in Python script execution." });
    }
  });

  pythonProcess.on("close", (code) => {
    clearTimeout(timeout); // Clear timeout when process finishes
    if (!isResponseSent) {
      isResponseSent = true;
      if (code === 0) {
        try {
          const skills = JSON.parse(result);
          res.status(200).json(skills);
        } catch (err) {
          res.status(500).json({ error: "Failed to parse skills data." });
        }
      } else {
        res.status(500).json({ error: "Error generating skills." });
      }
    }
  });
});

export default router;
