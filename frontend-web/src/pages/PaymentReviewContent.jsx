import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
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
  visibleQuestions,
  unansweredQuestions,
  generatePaymentAdvice,
} from "../utils/banking";
import {
  activeDraft,
  cancelPayment,
  completeReview,
  readAnswers,
  saveAnswers,
  saveReviewForLater,
} from "../utils/demoSession";
import { getRiskAssessment } from "../utils/riskSession";
import usePaymentRestriction from "../utils/usePaymentRestriction";

import "../css/banking-flow.css";
import "../css/payment-review-notice.css";
// import { usePaymentBehaviour } from "../context/PaymentBehaviourContext";

const yesNo = [
  ["yes", "Yes"],
  ["no", "No"],
];

const yesNoUnsure = [...yesNo, ["unsure", "Not sure"]];

const questions = [
  {
    id: "extraFee",
    label: "Has the seller requested an additional fee after an earlier payment?",
    options: yesNoUnsure,
  },
  {
    id: "disclosed",
    label: "Was this fee disclosed before your earlier payment?",
    options: yesNoUnsure,
  },
  {
    id: "source",
    label: "Where did you find this seller?",
    description: "Knowing the source helps identify impersonation risks.",
    options: [
      ["retailer", "An established retailer"],
      ["marketplace", "Online marketplace"],
      ["social", "Social media / messaging app"],
      ["unknown", "I am not sure"],
    ],
  },
  {
    id: "identity",
    label: "Have you independently verified who will receive the payment?",
    description:
      "For example, using an official website or contact number you looked up yourself.",
    options: yesNoUnsure,
  },
  {
    id: "urgency",
    label:
      "Are you being pressured to pay before independently checking the request?",
    description: "Examples include threats, countdowns or urgent requests.",
    options: yesNoUnsure,
  },
  {
    id: "reviews",
    label: "Have you checked independent seller reviews or history?",
    description:
      "This question appears when extra seller verification may help.",
    options: yesNoUnsure,
  },
  {
    id: "secrecy",
    label: "Were you told to keep this payment secret?",
    description: "This question appears because you reported payment pressure.",
    options: yesNo,
  },
];

export default function PaymentReview() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const restriction = usePaymentRestriction();

  const [draft] = useState(activeDraft);
  const [answers, setAnswers] = useState(() => readAnswers(draft));
  const [showSummary, setShowSummary] = useState(false);
  const [missing, setMissing] = useState([]);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState(null);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [actionError, setActionError] = useState("");

  const savingRef = useRef(false);
  const timerRef = useRef(null);
  const cancelPending = useRef(false);

  // const { recordPaymentClick } = usePaymentBehaviour();

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function answerQuestion(id, value) {
    const updated = cleanAnswers({ ...answers, [id]: value });

    setAnswers(updated);
    setMissing([]);
    setShowSummary(false);
    setSaveMessage(null);
    setActionError("");

    try {
      saveAnswers(draft, updated);
    } catch (err) {
      setActionError(err.message);
    }
  }

  function generateSummary() {
    const unanswered = unansweredQuestions(answers);
    setMissing(unanswered);
    setActionError("");

    if (unanswered.length > 0) {
      setShowSummary(false);
      document.getElementById(`question-${unanswered[0]}`)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    try {
      saveAnswers(draft, answers);
      setShowSummary(true);
    } catch (err) {
      setShowSummary(false);
      setActionError(err.message);
    }
  }

  function saveForLater() {
    if (savingRef.current) return;

    savingRef.current = true;
    setSaving(true);
    setSaveMessage(null);

    timerRef.current = setTimeout(() => {
      try {
        // Existing demo option: /transfer/review?save=error
        if (params.get("save") === "error") {
          throw new Error("Demo save failure");
        }

        saveReviewForLater(demoCustomer.id, draft, answers);
        setSaveMessage({
          type: "success",
          text: "Your review was saved in this browser session. No payment was sent. Resume it from Transfer & Pay.",
        });
      } catch {
        setSaveMessage({
          type: "error",
          text: "We could not save your review. Please try again.",
        });
      } finally {
        savingRef.current = false;
        setSaving(false);
      }
    }, 400);
  }

  function finishReview() {
    try {
      completeReview(draft, answers);
      navigate("/transfer/confirmation");
    } catch (err) {
      setActionError(err.message);
    }
  }

  async function confirmCancellation() {
    if (cancelPending.current) return;

    cancelPending.current = true;
    setActionError("");

    try {
      await cancelPayment(draft);
      navigate("/transfer", {
        replace: true,
        state: { cancelled: true },
      });
    } catch {
      setActionError("Cancellation failed. Please try again.");
    } finally {
      cancelPending.current = false;
    }
  }

  if (!draft) return <Navigate to="/transfer" replace />;

  // Show the reasons already recorded for this payment.
  const assessment = getRiskAssessment();
  const reasons = Array.isArray(assessment?.reasons) ? assessment.reasons : [];

  const visibleIds = visibleQuestions(answers);
  const visible = questions.filter((question) =>
    visibleIds.includes(question.id),
  );
  const advice = showSummary ? generatePaymentAdvice(answers) : null;

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

        {/* Explain why the customer is seeing the payment review. */}
        <aside
          className="payment-review-notice"
          aria-labelledby="payment-review-notice-title"
        >
          <span className="payment-review-notice__icon" aria-hidden="true">
            <CircleAlert size={26} strokeWidth={2.5} />
          </span>

          <div>
            <strong id="payment-review-notice-title">
              Pause before you pay
            </strong>

            {reasons.length > 0 ? (
              <>
                <p>This payment needs a closer look:</p>
                <ul>
                  {reasons.map((reason) => (
                    <li key={reason}>{reason}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p>Check the recipient and amount before confirming this payment.</p>
            )}
          </div>
        </aside>

        <div className="flow-page-heading">
          <div>
            <span className="flow-eyebrow">PAYMENT SAFETY</span>
            <h1>Review Your E-commerce Payment</h1>
            <p>A few quick checks before you decide whether to proceed.</p>
          </div>
        </div>

        <div className="flow-demo-bar">
          Prototype · Guided review uses predefined rules, not AI or live fraud
          detection.
        </div>

        <section className="flow-panel flow-summary-card">
          <div className="flow-section-title">
            <h2>Payment Summary</h2>
            <span className="flow-tag">Read-only</span>
          </div>

          <p className="flow-payment-amount">{formatSGD(draft.amount)}</p>

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

        <section className="flow-panel flow-questions">
          <div className="flow-section-title">
            <div>
              <span className="flow-eyebrow">GUIDED CHECK</span>
              <h2>Help Us Understand This Payment</h2>
            </div>
            <ShieldCheck size={27} className="flow-red" />
          </div>

          <p className="flow-muted">
            Your answers help highlight potential warning signs. Additional
            questions appear when relevant.
          </p>

          {visible.map((question, index) => (
            <fieldset
              key={question.id}
              id={`question-${question.id}`}
              className={`flow-question ${
                missing.includes(question.id) ? "flow-question-error" : ""
              }`}
            >
              <legend>
                <span className="flow-question-number">{index + 1}</span>
                {question.label}
              </legend>

              {question.description && (
                <p className="flow-muted">{question.description}</p>
              )}

              <div className="flow-options">
                {question.options.map(([value, label]) => (
                  <label
                    key={value}
                    className={`flow-option ${
                      answers[question.id] === value ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={value}
                      checked={answers[question.id] === value}
                      onChange={() => answerQuestion(question.id, value)}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>

              {missing.includes(question.id) && (
                <p className="flow-inline-error">Please select an answer.</p>
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
              Answer all visible questions to generate your safety summary.
            </p>
          </div>
        </section>

        {advice && (
          <section className="flow-panel flow-results">
            <div className="flow-section-title">
              <div>
                <span className="flow-eyebrow">YOUR REVIEW</span>
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
                  This is guidance only. It cannot establish whether the payment
                  is safe.
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
                disabled={Boolean(restriction)}
                onClick={finishReview}
              >
                Continue to confirmation
                <CheckCircle2 size={18} />
              </button>
            </div>
          </section>
        )}

        {restriction && (
          <p className="flow-panel" role="status">
            {restriction}. Confirmation is unavailable while this restriction is
            active.
          </p>
        )}

        {actionError && (
          <p className="flow-inline-error" role="alert">
            {actionError}
          </p>
        )}

        <section className="flow-panel flow-save-card">
          <div className="flow-section-title">
            <div>
              <h2>Not Ready to Proceed?</h2>
              <p className="flow-muted">
                Pause and verify the recipient before making a decision.
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
              disabled={saving || confirmCancel}
              onClick={saveForLater}
            >
              {saving ? "Saving..." : "Save and verify later"}
            </button>
          </div>

          {confirmCancel ? (
            <div
              className="flow-panel"
              role="group"
              aria-label="Confirm cancellation"
            >
              <h3>Cancel this payment?</h3>
              <p>This will discard this payment and its saved review.</p>

              <div className="flow-button-row">
                <button
                  type="button"
                  className="flow-button flow-button-secondary"
                  onClick={() => {
                    setConfirmCancel(false);
                    setActionError("");
                  }}
                >
                  Keep reviewing
                </button>

                <button
                  type="button"
                  className="flow-button flow-button-primary"
                  onClick={confirmCancellation}
                >
                  Confirm cancellation
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="flow-back flow-back-button"
              disabled={saving}
              onClick={() => setConfirmCancel(true)}
            >
              Cancel payment
            </button>
          )}

          {saveMessage && (
            <div className={`flow-feedback ${saveMessage.type}`} role="status">
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
            For this demo, saving works only in this browser session. No payment
            is submitted.
          </p>
        </section>
      </div>
    </main>
  );
}