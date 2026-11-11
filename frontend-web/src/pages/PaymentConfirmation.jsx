import { Link, Navigate } from "react-router-dom";
import { activeDraft, canConfirm } from "../utils/demoSession";
import { formatSGD, maskIdentifier } from "../utils/banking";
import usePaymentRestriction from "../utils/usePaymentRestriction";
import "../css/banking-flow.css";

export default function PaymentConfirmation() {
  // Re-check eligibility if the simulator changes a restriction on this page.
  usePaymentRestriction();

  const draft = activeDraft();

  if (!draft) return <Navigate to="/transfer" replace />;
  if (!canConfirm()) return <Navigate to="/transfer/review" replace />;

  return (
    <main className="flow-page">
      <div className="flow-shell flow-narrow">
        <section className="flow-panel">
          <h1>Final payment confirmation</h1>
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
          </dl>

          <p>Your safety review is complete. No payment has been sent.</p>

          <div className="flow-button-row">
            <Link className="flow-button flow-button-secondary" to="/transfer">
              Edit payment
            </Link>
            <Link
              className="flow-button flow-button-secondary"
              to="/transfer/review"
            >
              Back to safety review
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}