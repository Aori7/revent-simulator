
import { useParams, Link } from "react-router-dom";

import {
  ArrowLeft,
  CircleCheck,
  CircleAlert,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";

import {
  demoCustomer,
  demoAccount,
  demoTransactions,
} from "../data/demoBanking";

import {
  formatSGD,
  maskIdentifier,
} from "../utils/banking";

import "../css/banking-flow.css";

function DetailRow({ label, value }) {
  return (
    <div className="flow-detail-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function TransactionDetails() {
  const { transactionId } = useParams();

  // Demo-only ownership check against fictional sample data.
  // Real applications must enforce access on the server.
  const transaction = demoTransactions.find(
    (item) =>
      item.id === transactionId &&
      item.customerId === demoCustomer.id &&
      item.accountId === demoAccount.id
  );

  return (
    <main className="flow-page">
      <div className="flow-shell flow-narrow">
        <Link className="flow-back" to="/accounts">
          <ArrowLeft size={19} />
          Back to account overview
        </Link>

        <div className="flow-page-heading">
          <div>
            <span className="flow-eyebrow">ACCOUNT ACTIVITY</span>
            <h1>Transaction Details</h1>
            <p>Review the details of your selected transaction.</p>
          </div>
        </div>

        {!transaction ? (
          <div className="flow-panel flow-message" role="alert">
            <CircleAlert size={34} />
            <h2>Transaction not found</h2>

            <p>
              This transaction is unavailable or does not belong
              to the demo account.
            </p>

            <Link
              className="flow-button flow-button-primary"
              to="/accounts"
            >
              Return to accounts
            </Link>
          </div>
        ) : (
          <section className="flow-panel flow-transaction-details">
            <div className="flow-transaction-symbol">
              <ReceiptText size={30} />
            </div>

            <p className="flow-muted">
              {transaction.amount > 0
                ? "Money received"
                : "Money sent"}
            </p>

            <h2
              className={
                transaction.amount > 0 ? "flow-credit" : ""
              }
            >
              {transaction.amount > 0 ? "+" : "−"}
              {formatSGD(transaction.amount)}
            </h2>

            <div className="flow-status">
              <CircleCheck size={17} />
              {transaction.status}
            </div>

            <dl className="flow-detail-list">
              <DetailRow
                label="Transaction"
                value={transaction.name}
              />

              <DetailRow
                label="Transaction type"
                value={transaction.type}
              />

              <DetailRow
                label="Date and time"
                value={`${transaction.date}, ${transaction.time} SGT`}
              />

              <DetailRow
                label="Direction"
                value={
                  transaction.amount > 0
                    ? "Incoming"
                    : "Outgoing"
                }
              />

              <DetailRow label="Currency" value="SGD" />

              <DetailRow
                label="Counterparty"
                value={transaction.counterparty}
              />

              <DetailRow
                label="Counterparty identifier"
                value={maskIdentifier(transaction.counterpartyNumber)}
              />

              <DetailRow
                label="Your account"
                value={maskIdentifier(demoAccount.accountNumber)}
              />

              <DetailRow
                label="Description"
                value={transaction.description}
              />

              <DetailRow
                label="Reference number"
                value={transaction.reference}
              />
            </dl>

            <p className="flow-trust-note">
              <ShieldCheck size={18} />
              Sample data for prototype demonstration only.
            </p>

            <Link
              className="flow-button flow-button-secondary flow-wide"
              to="/accounts"
            >
              <ArrowLeft size={18} />
              Back to account overview
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}

export default TransactionDetails;
