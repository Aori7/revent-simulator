
import { useState } from "react";

import ChatbotHome from "../components/scamChatbot/ChatbotHome";
import AnalysisResults from "../components/scamChatbot/AnalysisResults";

import FollowUpQuestions, {
  getFollowUpQuestions
} from "../components/scamChatbot/FollowUpQuestions";

import "../css/scam-chatbot.css";

// Express backend running on port 5000
const API_URL = "http://localhost:5000";

// Real IBM analysis is enabled
const PREVIEW_MODE = false;

export default function ScamChatbot() {
  const [message, setMessage] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [answer, setAnswer] = useState("");
  const [followUpLoading, setFollowUpLoading] = useState(false);
  const [followUpError, setFollowUpError] = useState("");

  // Send requests to Express backend
  async function requestAI(path, body) {
    const response = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "The AI request failed."
      );
    }

    return data;
  }

  // SCREEN 1 & 2 -> SCREEN 3
  async function handleAnalyse() {
    if (!message.trim() || loading) return;

    setLoading(true);
    setError("");
    setAnalysis(null);
    setSelectedIndex(null);
    setAnswer("");
    setFollowUpError("");

    if (PREVIEW_MODE) {
      const sampleAnalysis = {
        riskLevel: "High",
        summary:
          "This message contains several warning signs commonly associated with phishing scams.",
        warningSigns: [
          "Urgency and pressure|Demands action within 30 minutes.",
          "Suspicious verification link|Directs you to an unverified website.",
          "Bank impersonation|Claims to be OCBC without verification."
        ],
        recommendations: [
          "Do not click the link or share banking details.",
          "Verify the alert through the official bank app or website."
        ]
      };

      setAnalysis(sampleAnalysis);
      setLoading(false);
      return;
    }

    // REAL IBM WATSONX.AI ANALYSIS
    try {
      const data = await requestAI(
        "/api/scam/analyze",
        {
          message: message.trim()
        }
      );

      // Backend returns the analysis directly
      setAnalysis(data);
    } catch (err) {
      setError(
        err.message || "Unable to connect to IBM AI."
      );
    } finally {
      setLoading(false);
    }
  }

  // DYNAMIC FOLLOW-UP QUESTIONS
  async function handleFollowUp(index) {
    if (!analysis || followUpLoading) return;

    // Select questions based on the analysed message
    const questions = getFollowUpQuestions(message);
    const selectedQuestion = questions[index];

    if (!selectedQuestion) return;

    setSelectedIndex(index);
    setAnswer("");
    setFollowUpError("");
    setFollowUpLoading(true);

    if (PREVIEW_MODE) {
      const sampleAnswers = [
        "The message may impersonate a trusted organisation. Verify any unexpected requests through official channels.",

        "Avoid sharing sensitive information. Contact the organisation through its official website or app if you are unsure.",

        "Open the organisation's official app or manually enter its website address. Do not rely on contact details supplied in suspicious messages."
      ];

      setAnswer(sampleAnswers[index]);
      setFollowUpLoading(false);
      return;
    }

    // REAL IBM AI FOLLOW-UP
    try {
      const data = await requestAI(
        "/api/scam/follow-up",
        {
          message: message.trim(),
          analysis,
          question: selectedQuestion
        }
      );

      setAnswer(data.answer);
    } catch (err) {
      setFollowUpError(
        err.message ||
          "Unable to generate a follow-up answer."
      );
    } finally {
      setFollowUpLoading(false);
    }
  }

  // RESET TO FIRST SCREEN
  function handleReset() {
    setMessage("");
    setAnalysis(null);
    setLoading(false);
    setError("");
    setSelectedIndex(null);
    setAnswer("");
    setFollowUpLoading(false);
    setFollowUpError("");
  }

  return (
    <div className="scam-chatbot-page">
      <div className="scam-chatbot-container">
        {!analysis ? (
          <ChatbotHome
            message={message}
            setMessage={setMessage}
            onAnalyse={handleAnalyse}
            loading={loading}
            error={error}
          />
        ) : (
          <>
            <AnalysisResults
              analysis={analysis}
              message={message}
            >
              <FollowUpQuestions
                message={message}
                selectedIndex={selectedIndex}
                onSelect={handleFollowUp}
                answer={answer}
                loading={followUpLoading}
                error={followUpError}
              />
            </AnalysisResults>

            <div className="scam-reset-row">
              <button
                type="button"
                className="scam-primary-button"
                onClick={handleReset}
              >
                Check Another Message
              </button>
            </div>

            <p className="scam-results-disclaimer">
              AI analysis is advisory and may be inaccurate.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
