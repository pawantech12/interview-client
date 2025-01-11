import express from "express";
import interviewRoutes from "./routes/routes";
import alljobspostedRoute from "./routes/alljobsposted";
import jobapplicationroute from "./routes/jobapplicationroutes";
import skills from "./routes/skills";
import cors from "cors";
import connectDB from "./db/db.connect";

const app = express();

app.use(express.json());
app.use(cors());
import fs from "fs";
import path from "path";

app.use("/", interviewRoutes);
app.use("/jobs", jobapplicationroute);
app.use("/api/skills", skills);
import { fileURLToPath } from "url";

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDirectory = path.join(__dirname, "images");

// Endpoint to get the list of image filenames
app.get("/api/images", (req, res) => {
  fs.readdir(imagesDirectory, (err, files) => {
    if (err) {
      return res.status(500).send("Error reading images directory");
    }
    // Filter out non-image files if needed
    const imageFiles = files.filter((file) =>
      /\.(jpeg|jpg|png|gif)$/i.test(file)
    );
    res.json(imageFiles);
  });
});
import skillsGeneratorRoute from "./routes/skillsgeneratorroute";

app.use("/api", skillsGeneratorRoute);

app.use("/api/alljobsposted", alljobspostedRoute);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
