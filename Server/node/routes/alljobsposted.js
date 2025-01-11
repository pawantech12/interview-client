import express from "express";
import JobPosted from "../Models/JobPosted";

const router = express.Router();

// Route to get all product details
router.get("/jobs_posted", async (req, res) => {
  try {
    const jobPosted = await JobPosted.find(); // Fetch all products

    res.status(200).json(jobPosted);
  } catch (error) {
    console.error("Error fetching product data:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// to fetch specific job post details
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const job = await JobPosted.findById(id).populate("applicants");
    if (!job) {
      return res.status(404).json({ message: "Job post not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job post data:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.post("/upload_job_posted", async (req, res) => {
  try {
    const { jobTitle, designation, jobType, workplaceType } = req.body;

    // Simple validation
    if (!jobTitle || !designation || !jobType || !workplaceType) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      });
    }

    const newJobPost = new JobPosted({
      jobTitle,
      designation,
      jobType,
      workplaceType,
    });

    const savedJobPost = await newJobPost.save();

    res.status(201).json({
      success: true,
      message: "Job post created successfully",
      job: savedJobPost,
    });
  } catch (error) {
    console.error("Error creating job post:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.put("/update_job_posted/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { jobDescription, mainSkills, subSkills } = req.body;

    // Simple validation
    if (!jobDescription || !mainSkills.length || !subSkills.length) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      });
    }

    const updatedJobPost = await JobPosted.findByIdAndUpdate(
      id,
      { $set: { jobDescription, mainSkills, subSkills } },
      { new: true, runValidators: true }
    );

    if (!updatedJobPost) {
      return res.status(404).json({
        success: false,
        message: "Job post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job post updated successfully",
      job: updatedJobPost,
    });
  } catch (error) {
    console.error("Error updating job post:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.put("/job_posted/:id", async (req, res) => {
  const { id } = req.params;
  const { salaryRange, benefits, jobPortalsPosting } = req.body;

  // Validate request body
  if (
    !salaryRange ||
    !salaryRange.minSalary ||
    !salaryRange.maxSalary ||
    !jobPortalsPosting.length
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all required fields.",
    });
  }

  if (Number(salaryRange.minSalary) > Number(salaryRange.maxSalary)) {
    return res.status(400).json({
      success: false,
      message: "Minimum salary cannot be greater than maximum salary.",
    });
  }

  try {
    const updatedJobPost = await JobPosted.findByIdAndUpdate(
      id,
      {
        salaryRange,
        benefits,
        jobPortalsPosting,
      },
      { new: true, runValidators: true } // Return updated document
    );

    if (!updatedJobPost) {
      return res.status(404).json({
        success: false,
        message: "Job post not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job post updated successfully.",
      job: updatedJobPost,
    });
  } catch (error) {
    console.error("Error updating job post:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
});

export default router;
