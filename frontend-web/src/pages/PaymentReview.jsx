
import { useEffect, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  BookmarkCheck,
  CheckCircle2,
  CircleAlert,
  Info,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

import { demoCustomer } from "../data/demoBanking";

import {
  formatSGD,
  maskIdentifier,
  cleanAnswers,
  unansweredQuestions,
  generatePaymentAdvice,
} from "../utils/banking";

import {
  readDraft,
  readAnswers,
  saveAnswers,
  saveReviewForLater,
} from "../utils/demoSession";

import "../css/banking-flow.css";

const questions = [
  {
    id: "source",
    label: "Where did you find this seller?",
    description:
      "Knowing the source helps identify impersonation risks.",
    options: [
      ["retailer", "An established retailer"],
      ["marketplace", "Online marketplace"],
      ["social", "Social media / messaging app"],
      ["unknown", "I am not sure"],
    ],
  },
  {
    id: "identity",
    label:
      "Have you independently verified who will receive the payment?",
    description:
      "For example, using an official website or contact number you looked up yourself.",
    options: [
      ["yes", "Yes"],
      ["no", "No"],
      ["unsure", "I am not sure"],
    ],
  },
  {
    id: "urgency",
    label: "Is anyone pressuring you to pay immediately?",
    description:
      "Examples include threats, countdowns or urgent requests.",
    options: [
      ["yes", "Yes"],
      ["no", "No"],
    ],
  },
  {
    id: "reviews",
    label:
      "Have you checked independent seller reviews or history?",
    description:
      "This question appears when extra seller verification may help.",
    options: [
      ["yes", "Yes"],
      ["no", "No"],
      ["unsure", "I am not sure"],
    ],
  },
  {
    id: "secrecy",
    label: "Were you told to keep this payment secret?",
    description:
      "This question appears because you reported payment pressure.",
    options: [
      ["yes", "Yes"],
      ["no", "No"],
    ],
  },
];

function PaymentReview() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [draft] = useState(readDraft);
  const [answers, setAnswers] = useState(() =>
    readAnswers(draft)
  );

  const [showSummary, setShowSummary] = useState(false);
  const [missing, setMissing] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);
  const [completed, setCompleted] = useState(false);

  const savingRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function answerQuestion(id, value) {
    const updated = cleanAnswers({
      ...answers,
      [id]: value,
    });

    setAnswers(updated);
    saveAnswers(draft, updated);

    setMissing([]);
    setShowSummary(false);
    setSaveMessage(null);
  }

  function generateSummary() {
    const unanswered = unansweredQuestions(answers);

    if (unanswered.length > 0) {
      setMissing(unanswered);
      setShowSummary(false);

      document
        .getElementById(`question-${unanswered[0]}`)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

      return;
    }

    saveAnswers(draft, answers);
    setShowSummary(true);
    setMissing([]);
  }

  function saveForLater() {
    // Prevent duplicate submissions.
    if (savingRef.current) return;

    savingRef.current = true;
    setSaving(true);
    setSaveMessage(null);

    timerRef.current = setTimeout(() => {
      try {
        // Optional demonstration of a failed save.
        if (params.get("save") === "error") {
          throw new Error("Demo save failure");
        }

        saveReviewForLater(
          demoCustomer.id,
          draft,
          answers
        );

        setSaveMessage({
          type: "success",
          text:
            "Your review was saved in this browser session. You can resume it from Transfer & Pay.",
        });
      } catch {
        setSaveMessage({
          type: "error",
          text:
            "We could not save your review. Please try again.",
        });
      } finally {
        savingRef.current = false;
        setSaving(false);
      }
    }, 400);
  }

  function finishReview() {
    if (unansweredQuestions(answers).length > 0) return;

    sessionStorage.setItem(
      "revent.demo.completedReview",
      JSON.stringify({
        customerId: demoCustomer.id,
        draft,
        answers,
        completedAt: new Date().toISOString(),
      })
    );

    setCompleted(true);
  }

  const visible = questions.filter((question) => {
    if (question.id === "reviews") {
      return ["social", "unknown"].includes(answers.source);
    }

    if (question.id === "secrecy") {
      return answers.urgency === "yes";
    }

    return true;
  });

  const advice = showSummary
    ? generatePaymentAdvice(answers)
    : null;

  if (completed) {
    return (
      <main className="flow-page">
        <div className="flow-shell flow-narrow">
          <div className="flow-panel flow-message">
            <CheckCircle2 size={48} className="flow-credit" />

            <h1>Safety Review Completed</h1>

            <p>
              You have reviewed the warning signs and
              verification steps. No payment was sent.
            </p>

            <div className="flow-trust-note">
              <Info size={18} />
              This prototype cannot confirm whether
              a recipient is legitimate.
            </div>

            <div className="flow-button-row">
              <Link
                className="flow-button flow-button-primary"
                to="/"
              >
                Return home
              </Link>

              <Link
                className="flow-button flow-button-secondary"
                to="/transfer"
              >
                Back to payment
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flow-page">
      <div className="flow-shell flow-narrow">
        <button
          type="button"
          className="flow-back flow-back-button"
          onClick={() => navigate("/transfer")}
        >
          <ArrowLeft size={19} />
          Edit payment details
        </button>

        <div className="flow-page-heading">
          <div>
            <span className="flow-eyebrow">PAYMENT SAFETY</span>

            <h1>Review Your E-commerce Payment</h1>

            <p>
              A few quick checks before you decide
              whether to proceed.
            </p>
          </div>
        </div>

        <div className="flow-demo-bar">
          Prototype · Guided review uses predefined rules,
          not AI or live fraud detection.
        </div>

        {/* READ-ONLY PAYMENT SUMMARY */}
        <section className="flow-panel flow-summary-card">
          <div className="flow-section-title">
            <h2>Payment Summary</h2>
            <span className="flow-tag">Read-only</span>
          </div>

          <p className="flow-payment-amount">
            {formatSGD(draft.amount)}
          </p>

          <dl className="flow-detail-list">
            <div className="flow-detail-row">
              <dt>Recipient</dt>
              <dd>{draft.recipientName}</dd>
            </div>

            <div className="flow-detail-row">
              <dt>Recipient identifier</dt>
              <dd>{maskIdentifier(draft.recipientNumber)}</dd>
            </div>

            <div className="flow-detail-row">
              <dt>Reference</dt>
              <dd>{draft.reference || "—"}</dd>
            </div>
          </dl>
        </section>

        {/* GUIDED SAFETY QUESTIONS */}
        <section className="flow-panel flow-questions">
          <div className="flow-section-title">
            <div>
              <span className="flow-eyebrow">GUIDED CHECK</span>
              <h2>Help Us Understand This Payment</h2>
            </div>

            <ShieldCheck size={27} className="flow-red" />
          </div>

          <p className="flow-muted">
            Your answers help highlight potential warning signs.
            Additional questions appear when relevant.
          </p>

          {visible.map((question, index) => (
            <fieldset
              key={question.id}
              id={`question-${question.id}`}
              className={`flow-question ${
                missing.includes(question.id)
                  ? "flow-question-error"
                  : ""
              }`}
            >
              <legend>
                <span className="flow-question-number">
                  {index + 1}
                </span>
                {question.label}
              </legend>

              <p className="flow-muted">
                {question.description}
              </p>

              <div className="flow-options">
                {question.options.map(([value, label]) => (
                  <label
                    key={value}
                    className={`flow-option ${
                      answers[question.id] === value
                        ? "selected"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={value}
                      checked={answers[question.id] === value}
                      onChange={() =>
                        answerQuestion(question.id, value)
                      }
                    />

                    <span>{label}</span>
                  </label>
                ))}
              </div>

              {missing.includes(question.id) && (
                <p className="flow-inline-error">
                  Please select an answer.
                </p>
              )}
            </fieldset>
          ))}

          <div className="flow-review-actions">
            <button
              type="button"
              className="flow-button flow-button-primary"
              onClick={generateSummary}
            >
              Generate my safety summary
              <ArrowRight size={18} />
            </button>

            <p className="flow-muted">
              Answer all visible questions to generate
              your safety summary.
            </p>
          </div>
        </section>

        {/* PERSONALISED REVIEW RESULTS */}
        {showSummary && advice && (
          <section className="flow-panel flow-results">
            <div className="flow-section-title">
              <div>
                <span className="flow-eyebrow">
                  YOUR REVIEW
                </span>
                <h2>Suggested Verification Steps</h2>
              </div>

              {advice.needsExtraCare ? (
                <ShieldAlert size={29} className="flow-red" />
              ) : (
                <ShieldCheck size={29} className="flow-credit" />
              )}
            </div>

            <div
              className={`flow-risk-note ${
                advice.needsExtraCare
                  ? "flow-risk-warning"
                  : "flow-risk-neutral"
              }`}
            >
              {advice.needsExtraCare ? (
                <CircleAlert size={22} />
              ) : (
                <Info size={22} />
              )}

              <div>
                <strong>
                  {advice.needsExtraCare
                    ? "Potential concerns identified"
                    : "No specific warning signs identified from your answers"}
                </strong>

                <p>
                  This is guidance only. It cannot establish
                  whether the payment is safe.
                </p>
              </div>
            </div>

            {advice.concerns.length > 0 && (
              <>
                <h3>Things to Watch Out For</h3>

                <ul className="flow-advice-list">
                  {advice.concerns.map((concern) => (
                    <li key={concern}>{concern}</li>
                  ))}
                </ul>
              </>
            )}

            <h3>Before You Decide</h3>

            <ol className="flow-advice-list">
              {advice.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>

            <div className="flow-review-actions">
              <button
                type="button"
                className="flow-button flow-button-primary"
                onClick={finishReview}
              >
                Finish safety review
                <CheckCircle2 size={18} />
              </button>
            </div>
          </section>
        )}

        {/* SAVE AND RESUME */}
        <section className="flow-panel flow-save-card">
          <div className="flow-section-title">
            <div>
              <h2>Not Ready to Proceed?</h2>

              <p className="flow-muted">
                Pause and verify the recipient before
                making a decision.
              </p>
            </div>

            <BookmarkCheck size={26} className="flow-red" />
          </div>

          <div className="flow-button-row">
            <button
              type="button"
              className="flow-button flow-button-secondary"
              onClick={() => navigate("/transfer")}
            >
              Edit payment
            </button>

            <button
              type="button"
              className="flow-button flow-button-primary"
              disabled={saving}
              onClick={saveForLater}
            >
              {saving ? "Saving..." : "Save and verify later"}
            </button>
          </div>

          {saveMessage && (
            <div
              className={`flow-feedback ${saveMessage.type}`}
              role="status"
            >
              {saveMessage.type === "success" ? (
                <CheckCircle2 size={20} />
              ) : (
                <CircleAlert size={20} />
              )}

              <span>{saveMessage.text}</span>
            </div>
          )}

          {saveMessage?.type === "success" && (
            <Link className="flow-back" to="/transfer">
              Go to your saved review
              <ArrowRight size={17} />
            </Link>
          )}

          <p className="flow-muted flow-small">
            For this demo, saving works only in this
            browser session. No payment is submitted.
          </p>
        </section>
      </div>
    </main>
  );
}

export default PaymentReview;
