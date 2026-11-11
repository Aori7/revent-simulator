
import {
  MessageCircleQuestion,
  ChevronRight,
  LoaderCircle
} from "lucide-react";

export const FOLLOW_UP_QUESTIONS = [
  "What are the main warning signs in this message?",
  "What should I do if I already clicked the link?",
  "How can I verify whether this message is genuine?"
];

export const NO_LINK_QUESTIONS = [
  "What are the main warning signs in this message?",
  "What should I do next to stay safe?",
  "How can I verify whether this message is genuine?"
];

// Detect links in the original message
export function messageContainsLink(message) {
  if (typeof message !== "string") {
    return false;
  }

  return /(?:https?:\/\/|www\.)[^\s]+/i.test(message);
}

// Choose questions based on the original message
export function getFollowUpQuestions(message) {
  return messageContainsLink(message)
    ? FOLLOW_UP_QUESTIONS
    : NO_LINK_QUESTIONS;
}

// Format IBM's answer into readable paragraphs and steps
function formatAnswer(answer) {
  if (typeof answer !== "string" || !answer.trim()) {
    return [];
  }

  const cleaned = answer
    .replace(/\r\n/g, "\n")
    .replace(/\*\*/g, "")
    .replace(/(^|\s)(\d{1,2})\.\s+/g, "\n$2. ")
    .trim();

  return cleaned
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function FollowUpQuestions({
  message,
  selectedIndex,
  onSelect,
  answer,
  loading,
  error
}) {
  const questions = getFollowUpQuestions(message);
  const answerLines = formatAnswer(answer);

  return (
    <section className="scam-figma-card scam-guidance-panel">
      <div className="scam-heading">
        <div className="scam-hero-icon">
          <MessageCircleQuestion size={24} />
        </div>

        <div>
          <h2>Need More Guidance?</h2>
          <p>Select a follow-up question to learn more.</p>
        </div>
      </div>

      <div className="follow-up-options">
        {questions.map((question, index) => (
          <button
            key={question}
            type="button"
            className={
              selectedIndex === index
                ? "follow-up-option selected"
                : "follow-up-option"
            }
            onClick={() => onSelect(index)}
            disabled={loading}
          >
            <span>{question}</span>
            <ChevronRight size={18} />
          </button>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="follow-up-answer" aria-live="polite">
          <strong className="follow-up-answer-title">
            {questions[selectedIndex]}
          </strong>

          {loading ? (
            <div className="follow-up-loading">
              <LoaderCircle
                size={18}
                className="follow-up-spinner"
              />
              <span>Generating your answer...</span>
            </div>
          ) : error ? (
            <p className="scam-error" role="alert">
              {error}
            </p>
          ) : answerLines.length > 0 ? (
            <div
              className="follow-up-answer-content"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "14px"
              }}
            >
              {answerLines.map((line, index) => {
                const stepMatch = line.match(
                  /^(\d{1,2})\.\s+(.+)$/
                );

                if (stepMatch) {
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px"
                      }}
                    >
                      <span
                        style={{
                          minWidth: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          backgroundColor: "#FFF1F2",
                          color: "#DC2626",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: "700",
                          flexShrink: 0
                        }}
                      >
                        {stepMatch[1]}
                      </span>

                      <p
                        style={{
                          margin: 0,
                          lineHeight: 1.6,
                          flex: 1,
                          overflowWrap: "anywhere"
                        }}
                      >
                        {stepMatch[2]}
                      </p>
                    </div>
                  );
                }

                return (
                  <p
                    key={index}
                    style={{
                      margin: 0,
                      lineHeight: 1.6,
                      overflowWrap: "anywhere"
                    }}
                  >
                    {line}
                  </p>
                );
              })}
            </div>
          ) : (
            <p>No answer available yet.</p>
          )}
        </div>
      )}
    </section>
  );
}
