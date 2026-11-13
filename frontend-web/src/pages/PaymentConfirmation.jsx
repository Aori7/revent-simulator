import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { PhoneOff, ShieldAlert } from "lucide-react";

import { activeDraft, canConfirm } from "../utils/demoSession";
import { formatSGD, maskIdentifier } from "../utils/banking";
import { getRiskAssessment } from "../utils/riskSession";
import { useSimulator } from "../context/SimulatorContext";
import usePaymentRestriction from "../utils/usePaymentRestriction";

import "../css/banking-flow.css";
import { usePaymentBehaviour } from "../context/PaymentBehaviourContext";

export default function PaymentConfirmation() {
  usePaymentRestriction();

  const draft = activeDraft();
  const risk = getRiskAssessment();
  const isPayNow = draft?.transferType === "paynow";
  const { triggers } = useSimulator();
  const isOnCall = triggers.isOnCall;
  const [confirmed, setConfirmed] = useState(false);
  const [callBlocked, setCallBlocked] = useState(false);
  const {
    rapidClickDetected,
    clickFrequency,
    resetRapidClickDetection,
    recordPaymentClick,
  } = usePaymentBehaviour();

  const [rapidPauseAcknowledged, setRapidPauseAcknowledged] = useState(false);
  if (!draft) {
    return <Navigate to="/transfer" replace />;
  }

  if (!canConfirm()) {
    return <Navigate to="/transfer/review" replace />;
  }

  function handleConfirmTransfer() {
    const click = recordPaymentClick();

    // Highest priority: mandatory on-call interruption
    if (isOnCall) {
      setCallBlocked(true);
      return;
    }

    setCallBlocked(false);

    // Check current and previously detected rapid interactions
    if ((rapidClickDetected || click.detected) && !rapidPauseAcknowledged) {
      return;
    }

    // Simulated confirmation only
    setConfirmed(true);
  }

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

            <div className="flow-detail-row">
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

          {/* ON-CALL SAFETY INTERRUPTION */}
          {callBlocked && isOnCall && !confirmed && (
            <div className="call-safety-warning" role="alert">
              <div className="call-safety-heading">
                <ShieldAlert size={28} />
                <h2>Transfer Temporarily Blocked</h2>
              </div>

              <p>REVENT detected that you're currently on a phone call.</p>

              <p>
                Scammers may stay on the phone to pressure you into transferring
                money without thinking carefully.
              </p>

              <div className="call-safety-action">
                <PhoneOff size={24} />

                <div>
                  <strong>End your call before proceeding</strong>

                  <p>
                    Once your call has ended, you can try confirming your
                    transfer again.
                  </p>
                </div>
              </div>
            </div>
          )}
          {rapidClickDetected && !rapidPauseAcknowledged && !confirmed && (
            <div className="rapid-click-warning" role="alert">
              <h2>Hold on a moment</h2>

              <p>
                REVENT noticed several payment actions in a short period of
                time.
              </p>

              <p>
                Before continuing, please review your recipient and transfer
                amount.
              </p>

              <p>
                Detected frequency: {clickFrequency.toFixed(2)} clicks per
                second
              </p>

              <button
                type="button"
                onClick={() => {
                  setRapidPauseAcknowledged(true);
                  resetRapidClickDetection();
                }}
              >
                I've reviewed my payment details
              </button>
            </div>
          )}
          {/* SIMULATED CONFIRMATION */}
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
              onClick={handleConfirmTransfer}
            >
              Confirm Transfer
            </button>
          )}

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
    </main>
  );
}
