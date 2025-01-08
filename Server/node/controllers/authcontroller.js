import Candidate from "../Models/candidate.js";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import gTTS from "gtts";
// import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const test = () => {
  console.log("testing backend");
};

const storeInterviewData = async (req, res) => {
  const { candidate_name, question, answer } = req.body;
  console.log(candidate_name, question, answer);

  try {
    const candidate = await Candidate.findOne({ name: candidate_name });

    if (!candidate) {
      const newCandidate = new Candidate({
        name: candidate_name,
        interview_data: [{ question, response: answer }],
        questions_asked: 1,
      });
      await newCandidate.save();
      return res.status(201).json({
        message: "Interview data saved successfully",
        candidate: newCandidate,
      });
    } else {
      const updatedCandidate = await Candidate.findOneAndUpdate(
        { name: candidate_name },
        {
          $push: {
            interview_data: {
              question: question,
              response: answer,
            },
          },
          $inc: { questions_asked: 1 },
        },
        { new: true }
      );

      return res.status(200).json({
        message: "Interview data updated successfully",
        candidate: updatedCandidate,
      });
    }
  } catch (error) {
    console.error("Error saving interview data:", error);
    res.status(500).json({ message: "Error saving interview data" });
  }
};

// const openai = new OpenAI();

// Create __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the output folder
const OUTPUT_FOLDER = path.resolve(__dirname, "output");

if (!fs.existsSync(OUTPUT_FOLDER)) {
  fs.mkdirSync(OUTPUT_FOLDER);
}

const aitts = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required for TTS." });
    }

    // Define the output file path
    const outputFilePath = path.join(OUTPUT_FOLDER, `output_${Date.now()}.mp3`);

    // Generate audio using gTTS
    const gtts = new gTTS(text, "en"); // Specify the language as "en" for English
    gtts.save(outputFilePath, (err) => {
      if (err) {
        console.error("Error generating TTS:", err);
        return res
          .status(500)
          .json({ error: "TTS generation failed.", details: err.message });
      }

      console.log(`File saved at: ${outputFilePath}`);

      // Send the audio file
      res.sendFile(outputFilePath, (err) => {
        if (err) {
          console.error("Error sending audio file:", err);
          return res.status(500).json({ error: "Failed to send audio file." });
        }

        // Clean up the generated file
        // fs.unlink(outputFilePath, (unlinkErr) => {
        //   if (unlinkErr) {
        //     console.error("Error deleting audio file:", unlinkErr);
        //   } else {
        //     console.log(`File deleted: ${outputFilePath}`);
        //   }
        // });
      });
    });
  } catch (error) {
    console.error("Error generating TTS:", error);
    res
      .status(500)
      .json({ error: "TTS generation failed.", details: error.message });
  }
};

export default {
  test,
  storeInterviewData,
  aitts,
};
