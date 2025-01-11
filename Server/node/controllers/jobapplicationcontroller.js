// controllers/jobController.js
import JobPosted from "../Models/JobPosted.js";
import Applicant from "../Models/Applicant.js";

// Controller to apply for a job
export const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params; // Extract jobId from route params
    const { applicantId } = req.body; // Extract applicantId from request body

    // Find the job post
    const job = await JobPosted.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job post not found" });
    }

    // Find the applicant
    const applicant = await Applicant.findById(applicantId);
    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }

    // Add applicant details to the job post's array of applicants
    if (!job.applicants) {
      job.applicants = [];
    }

    // Prevent duplicate applications
    const isAlreadyApplied = job.applicants.some(
      (app) => app._id.toString() === applicant._id.toString()
    );
    if (isAlreadyApplied) {
      return res.status(400).json({ message: "Applicant has already applied" });
    }

    job.applicants.push(applicant);
    await job.save();

    return res.status(200).json({
      message: "Application submitted successfully",
      job,
    });
  } catch (error) {
    console.error("Error applying to job:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};
