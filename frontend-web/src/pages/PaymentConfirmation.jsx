import { Link, Navigate } from "react-router-dom";
import { activeDraft, canConfirm } from "../utils/demoSession";
import { formatSGD, maskIdentifier } from "../utils/banking";
import usePaymentRestriction from "../utils/usePaymentRestriction";
import "../css/banking-flow.css";
import { getRiskAssessment } from "../utils/riskSession";
import { useState } from "react";

export default function PaymentConfirmation() {
  // Re-check eligibility if the simulator changes a restriction on this page.
  usePaymentRestriction();

  const draft = activeDraft();
  const risk = getRiskAssessment();
  const isPayNow = draft?.transferType === "paynow";
  const [confirmed, setConfirmed] = useState(false);
  if (!draft) return <Navigate to="/transfer" replace />;
  if (!canConfirm()) return <Navigate to="/transfer/review" replace />;

  return (
    <main className="flow-page">
      <div className="flow-shell flow-narrow">
        <section className="flow-panel">
          <h1>
            {isPayNow
              ? "Confirm PayNow Transfer"
              : "Final Payment Confirmation"}
          </h1>
          <p className="flow-payment-amount">{formatSGD(draft.amount)}</p>

          <dl className="flow-detail-list">
            <div className="flow-detail-row">
              <dt>Recipient</dt>
              <dd>{draft.recipientName}</dd>
            </div>
            <div className="flow-detail-row">
              <dt>Account / mobile</dt>
              <dd>{maskIdentifier(draft.recipientNumber)}</dd>
            </div>
            <div className="flow-detail-row">
              <dt>Reference</dt>
              <dd>{draft.reference || "—"}</dd>
            </div>
            <div>
              <dt>Payment method</dt>
              <dd>{isPayNow ? "PayNow" : "E-commerce Payment"}</dd>
            </div>
          </dl>
          {risk && (
            <div className="confirmation-risk">
              <strong>
                REVENT Risk Assessment: {risk.level.toUpperCase()}
              </strong>

              <p>
                {risk.level === "low"
                  ? "No significant risk indicators were detected."
                  : "Additional safety verification was required for this transfer."}
              </p>
            </div>
          )}

          <p>
            {risk?.level === "low"
              ? "Your transaction has passed the initial risk assessment. No payment has been sent."
              : "Your safety review is complete. No payment has been sent."}
          </p>

          <div className="flow-button-row">
            <Link
              to={isPayNow ? "/transfer/paynow" : "/transfer/ecommerce"}
              className="flow-button"
            >
              Edit payment
            </Link>
            {risk?.level !== "low" && (
              <Link to="/transfer/review" className="flow-button">
                Back to safety review
              </Link>
            )}
          </div>
        </section>
      </div>
      {confirmed ? (
        <div className="transfer-confirmed">
          <h2>Transfer Confirmed (Demo)</h2>
          <p>
            Your transfer has been confirmed in this prototype. No money has
            been deducted or sent.
          </p>
        </div>
      ) : (
        <button
          type="button"
          className="confirm-transfer-btn"
          onClick={() => setConfirmed(true)}
        >
          Confirm Transfer
        </button>
      )}
    </main>
  );
}
