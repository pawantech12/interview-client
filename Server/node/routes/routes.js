import express from "express";
import authcontroller from "../controllers/authcontroller";

const router = express.Router();

router.get("/", authcontroller.test);
router.post("/save-applicant", authcontroller.saveApplicantDetail);
router.post("/store_interview", authcontroller.storeInterviewData);
router.post("/speak", authcontroller.aitts);

export default router;
