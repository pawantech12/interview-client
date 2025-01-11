// models/jobPost.js
import mongoose from "mongoose";

const jobPostedSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    workplaceType: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      default: "",
      // required: true,
      trim: true,
    },
    mainSkills: {
      type: [String], // Array of strings for skills
      // required: true,
      default: [],
    },
    subSkills: {
      type: [String], // Array of strings for sub-skills
      // required: true,
      default: [],
    },
    applicants: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Applicant",
      default: [],
    },
    salaryRange: {
      minSalary: {
        type: Number,
        // required: true,
        default: 0,
      },
      maxSalary: {
        type: Number,
        // required: true,
        default: 0,
      },
    },
    benefits: {
      type: [String], // Array of strings for benefits
      // required: true,
      default: [],
    },
    jobPortalsPosting: {
      type: [String], // Array of strings for job portals
      // required: true,
      default: [],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
); // Add timestamps to track createdAt and updatedAt automatically

const JobPosted =
  mongoose.models.JobPosted || mongoose.model("JobPosted", jobPostedSchema);

export default JobPosted;
