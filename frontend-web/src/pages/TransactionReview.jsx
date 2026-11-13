// After Transfer

import { Navigate, useNavigate } from "react-router-dom";

import { demoAccount } from "../data/demoBanking";
import { readDraft, validPayment } from "../utils/demoSession";
import { maskIdentifier } from "../utils/banking";
import "../css/transaction-review.css";

function formatAmount(amount) {
  return Number(amount).toLocaleString("en-SG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function TransactionReview() {
  const navigate = useNavigate();

  // Retrieve the saved transaction draft.
  const draft = readDraft();

  // Redirect customers if no valid transaction draft exists.
  if (!draft || !validPayment(draft)) {
    return <Navigate to="/transfer" replace />;
  }

  const handleCancel = () => {
    navigate("/transfer", { state: { cancelled: true } });
  };

  const handleTransfer = () => {
    navigate("/transfer/confirmation");
  };

  return (
    <main className="transaction-review">
      <header className="transaction-review__header">
        <button
          type="button"
          className="transaction-review__icon-btn"
          onClick={() => navigate("/transfer/review")}
          aria-label="Back to transfer form"
        >
          &lt;
        </button>

        <button
          type="button"
          className="transaction-review__icon-btn"
          onClick={handleCancel}
          aria-label="Back to safety review"
        >
          x
        </button>
      </header>

      <h1 className="transaction-review__title">
        Transaction Review
      </h1>

      <section
        className="transaction-review__amount"
        aria-label="Transaction amount"
      >
        <span className="transaction-review__amount-label">
          Amount to transfer
        </span>

        <div className="transaction-review__amount-row">
          <span className="transaction-review__currency">
            SGD
          </span>

          <span className="transaction-review__value">
            S${formatAmount(draft.amount)}
          </span>
        </div>
      </section>

      <p className="transaction-review__hint">
        Please review your transaction details carefully before confirming.
      </p>

      <section
        className="transaction-review__details"
        aria-label="Transaction details"
      >
        <dl>
          <div className="transaction-review__row">
            <dt>From</dt>

            <dd className="transaction-review__name">
              {demoAccount.holderName || "Alex Tan"}
            </dd>

            <dd className="transaction-review__sub">
              {demoAccount.type},{" "}
              {maskIdentifier(demoAccount.accountNumber)}
            </dd>
          </div>

          <div className="transaction-review__row">
            <dt>To</dt>

            <dd className="transaction-review__name">
              {draft.recipientName}
            </dd>

            <dd className="transaction-review__sub">
              {maskIdentifier(draft.recipientNumber)}
            </dd>
          </div>

          {draft.reference && (
            <div className="transaction-review__row">
              <dt>Reference</dt>

              <dd className="transaction-review__name">
                {draft.reference}
              </dd>
            </div>
          )}

          <div className="transaction-review__row">
            <dt>Transaction Type</dt>

            <dd className="transaction-review__name">
              Online Transfer
            </dd>
          </div>
        </dl>
      </section>

      <div className="transaction-review__actions">
        <button
          type="button"
          className="transaction-review__submit"
          onClick={handleTransfer}
        >
          Transfer Now
        </button>
      </div>
    </main>
  );
}
