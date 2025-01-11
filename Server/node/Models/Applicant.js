import mongoose from "mongoose";
// Function to generate a random number between 200 and 1000
const generateRandomScore = () => {
  return Math.floor(Math.random() * (1000 - 200 + 1)) + 200;
};
const applicantSchema = new mongoose.Schema(
  {
    candidate_name: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: String, // Experience in years
      required: true,
      min: 0,
    },
    company: {
      type: String,
      trim: true,
      default: "Unemployed", // Default value for applicants without a current company
    },
    location: {
      type: String,
      trim: true,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    score: {
      type: Number,
      required: true,
      default: generateRandomScore,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Applicant = mongoose.model("Applicant", applicantSchema);

export default Applicant;
