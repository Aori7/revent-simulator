import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  LockKeyhole,
  BookmarkCheck,
  ShieldCheck,
} from "lucide-react";

import { demoAccount, demoCustomer } from "../data/demoBanking";
import {
  getSavedReview,
  invalidateReview,
  readDraft,
  saveDraft,
  saveAnswers,
  validPayment,
} from "../utils/demoSession";
import { formatSGD, maskIdentifier } from "../utils/banking";
import "../css/banking-flow.css";

export default function Transfer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState(readDraft);
  const [error, setError] = useState("");
  const saved = getSavedReview(demoCustomer.id);

  function update(field, value) {
    if (field !== "reference" && value !== form[field]) {
      invalidateReview();
    }

    setForm((old) => ({ ...old, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();

    const amount = Number(form.amount);

    if (
      !form.recipientName.trim() ||
      !form.recipientNumber.trim() ||
      !Number.isFinite(amount) ||
      amount <= 0 ||
      amount > demoAccount.balance
    ) {
      setError(
        `Enter a recipient and an amount between SGD 0.01 and ${formatSGD(demoAccount.balance)}.`
      );
      return;
    }

    if (!/^\d{8,16}$/.test(form.recipientNumber.replace(/[\s-]/g, ""))) {
      setError("Enter a valid 8–16 digit recipient identifier for this demo.");
      return;
    }

    if (!validPayment(form)) {
      setError("Enter a positive amount with up to two decimal places.");
      return;
    }

    try {
      saveDraft(form);
      setError("");
      navigate("/transfer/review");
    } catch (err) {
      setError(err.message);
    }
  }

  function resume() {
    try {
      const resumed = saveDraft(saved.draft);
      saveAnswers(resumed, saved.answers);
      navigate("/transfer/review");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="flow-page">
      <div className="flow-shell flow-narrow">
        <div className="flow-page-heading">
          <div>
            <span className="flow-eyebrow">TRANSFER & PAY</span>
            <h1>Make an E-commerce Payment</h1>
            <p>
              Review your payment information before proceeding to the safety check.
            </p>
          </div>
        </div>

        <div className="flow-demo-bar">
          Simulation only — no real payment will be sent.
        </div>

        {location.state?.cancelled && (
          <p className="flow-panel" role="status">
            Payment cancelled. No money was sent.
          </p>
        )}

        {saved && (
          <section className="flow-saved-banner">
            <BookmarkCheck size={24} />
            <div>
              <strong>You have a saved review</strong>
              <p>Resume your earlier review for {saved.draft.recipientName}.</p>
            </div>
            <button
              type="button"
              className="flow-button flow-button-secondary"
              onClick={resume}
            >
              Resume review
            </button>
          </section>
        )}

        <form className="flow-panel flow-form" onSubmit={submit} noValidate>
          <h2>Payment Information</h2>
          <p className="flow-muted">
            Sample recipient and payment details are pre-filled.
            You can edit them for the demonstration.
          </p>

          <div className="flow-form-group">
            <label>From account</label>
            <div className="flow-readonly">
              {demoAccount.type} · {maskIdentifier(demoAccount.accountNumber)}
              <span>{formatSGD(demoAccount.balance)} available</span>
            </div>
          </div>

          <div className="flow-form-group">
            <label htmlFor="recipient-name">Recipient / seller name</label>
            <input
              id="recipient-name"
              value={form.recipientName}
              maxLength={80}
              onChange={(e) => update("recipientName", e.target.value)}
              required
            />
          </div>

          <div className="flow-form-grid">
            <div className="flow-form-group">
              <label htmlFor="recipient-number">
                Recipient account / mobile number
              </label>
              <input
                id="recipient-number"
                value={form.recipientNumber}
                inputMode="numeric"
                maxLength={20}
                onChange={(e) => update("recipientNumber", e.target.value)}
                required
              />
            </div>

            <div className="flow-form-group">
              <label htmlFor="payment-amount">Amount (SGD)</label>
              <input
                id="payment-amount"
                type="number"
                min="0.01"
                max={demoAccount.balance}
                step="0.01"
                value={form.amount}
                onChange={(e) => update("amount", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flow-form-group">
            <label htmlFor="payment-reference">
              Payment reference (optional)
            </label>
            <input
              id="payment-reference"
              value={form.reference}
              maxLength={120}
              onChange={(e) => update("reference", e.target.value)}
            />
          </div>

          {error && (
            <p className="flow-inline-error" role="alert">{error}</p>
          )}

          <div className="flow-form-footer">
            <p>
              <ShieldCheck size={18} />
              Guided safety review before payment.
            </p>
            <button type="submit" className="flow-button flow-button-primary">
              Continue to safety review
              <ArrowRight size={18} />
            </button>
          </div>
        </form>

        <div className="flow-trust-note">
          <LockKeyhole size={17} />
          This prototype does not connect to a real bank.
        </div>

        <Link className="flow-back" to="/">Back to home</Link>
      </div>
    </main>
  );
}