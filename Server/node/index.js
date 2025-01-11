import express from "express";
import interviewRoutes from "./routes/routes.js";
import alljobspostedRoute from "./routes/alljobsposted.js";
import jobapplicationroute from "./routes/jobapplicationroutes.js";
import skills from "./routes/skills.js";
import cors from "cors";
import connectDB from "./db/db.connect.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", interviewRoutes);
app.use("/jobs", jobapplicationroute);
app.use("/api/skills", skills);
import skillsGeneratorRoute from "./routes/skillsgeneratorroute.js";

app.use("/api", skillsGeneratorRoute);

app.use("/api/alljobsposted", alljobspostedRoute);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
