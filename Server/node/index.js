import express from "express";
import interviewRoutes from "./routes/routes.js";
import cors from "cors";
import connectDB from "./db/db.connect.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", interviewRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
