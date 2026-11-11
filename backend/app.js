
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const {
  testIBMConnection,
  analyseScamMessage,
  answerScamFollowUp
} = require("./ibmService");

const app = express();

// Allow React frontend to communicate with backend
app.use(cors({
  origin: "http://localhost:5173"
}));

// Allow backend to receive JSON data
app.use(express.json({ limit: "20kb" }));

// Existing backend homepage
app.get("/", (req, res) => {
  res.send("OCBC Backend is running!");
});

// Check IBM configuration
app.get("/api/ibm/status", (req, res) => {
  res.json({
    apiKeyConfigured: Boolean(process.env.IBM_API_KEY),
    projectIdConfigured: Boolean(process.env.IBM_PROJECT_ID),
    region: process.env.IBM_REGION || "Not configured",
    modelIdConfigured: Boolean(process.env.IBM_MODEL_ID)
  });
});

// Test IBM connection
app.get("/api/ibm/test", async (req, res) => {
  try {
    const result = await testIBMConnection();

    res.json({
      success: true,
      message: "IBM watsonx.ai connection successful!",
      response: result
    });
  } catch (error) {
    console.error("IBM test failed:", error.message);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Analyse a suspicious message
app.post("/api/scam/analyze", async (req, res) => {
  try {
    const { message } = req.body || {};

    if (
      typeof message !== "string" ||
      !message.trim() ||
      message.length > 5000
    ) {
      return res.status(400).json({
        error: "Please enter a message of 1 to 5000 characters."
      });
    }

    const analysis = await analyseScamMessage(message);

    res.json(analysis);
  } catch (error) {
    console.error("Scam analysis failed:", error.message);

    res.status(500).json({
      error: "Unable to analyse the message. Please try again."
    });
  }
});

// Answer follow-up questions using IBM watsonx.ai
app.post("/api/scam/follow-up", async (req, res) => {
  try {
    const { message, analysis, question } = req.body || {};

    if (
      typeof message !== "string" ||
      !message.trim() ||
      message.length > 5000 ||
      typeof question !== "string" ||
      !question.trim() ||
      question.length > 500 ||
      !analysis ||
      typeof analysis !== "object" ||
      Array.isArray(analysis)
    ) {
      return res.status(400).json({
        error: "Invalid follow-up request."
      });
    }

    const answer = await answerScamFollowUp(
      message,
      analysis,
      question
    );

    res.json({ answer });
  } catch (error) {
    console.error("Follow-up failed:", error.message);

    res.status(500).json({
      error: "Unable to generate an answer. Please try again."
    });
  }
});

// Return JSON for unknown API routes
app.use("/api", (req, res) => {
  res.status(404).json({
    error: "API endpoint not found."
  });
});

// Start Express server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
