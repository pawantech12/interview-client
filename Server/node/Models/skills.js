// models/jobPost.js
import mongoose from "mongoose";

const subSkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
});
const depthOfRoundSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  expectationTitle: {
    type: String,
    required: true,
  },
  expectationDescription: {
    type: String,
    required: true,
  },
});

const skillsSchema = new mongoose.Schema(
  {
    jobPostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPosted", // Reference to the JobPosted model
      required: true, // Make it required if you want to enforce this relationship
    },
    mainSkills: {
      type: [String],
      required: true,
    },
    subSkills: {
      type: [subSkillSchema],
      // required: true,
    },
    mustHaveSkills: {
      type: String,
      // required: true,
    },
    depthOfRound: {
      type: [depthOfRoundSchema],
      // required: true,
    },
    goalOfRound: {
      type: String,
      default: "",
      // required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
); // Add timestamps to track createdAt and updatedAt automatically

const Skills = mongoose.models.Skills || mongoose.model("Skills", skillsSchema);

export default Skills;
