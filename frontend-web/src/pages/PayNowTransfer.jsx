import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Info,
  Smartphone,
} from "lucide-react";

import PageBanner from "../components/PageBanner";
import "../css/paynow-transfer.css";
import { useNavigate } from "react-router-dom";
import useTransactionRisk from "../hooks/useTransactionRisk";
import { saveRiskAssessment } from "../utils/riskSession";
import { saveDraft } from "../utils/demoSession";
import { demoAccount } from "../data/demoBanking";

// simulated PayNow directory for prototype testing
const demoRecipients = {
  91234567: {
    maskedName: "ALXX TAX",
    isNewRecipient: true,
  },
  87654321: {
    maskedName: "CHXX LXX",
    isNewRecipient: false,
  },
};

export default function PayNowTransfer() {
  const [mobile, setMobile] = useState("");
  const [recipient, setRecipient] = useState(null);
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { assess } = useTransactionRisk();
  function lookupRecipient() {
    const cleaned = mobile.replace(/\D/g, "");

    if (!/^[89]\d{7}$/.test(cleaned)) {
      setError("Enter a valid 8-digit Singapore mobile number.");
      setRecipient(null);
      return;
    }

    const found = demoRecipients[cleaned];

    if (!found) {
      setError("This number is not registered in the demo PayNow directory.");
      setRecipient(null);
      return;
    }

    setRecipient({
      ...found,
      mobile: cleaned,
    });

    setError("");
  }

  function submit(event) {
    event.preventDefault();

    const cleaned = mobile.replace(/\D/g, "");
    const value = Number(amount);

    if (!recipient || recipient.mobile !== cleaned) {
      setError("Please verify the recipient before continuing.");
      return;
    }

    if (
      !Number.isFinite(value) ||
      value <= 0 ||
      !/^\d+(\.\d{1,2})?$/.test(amount) ||
      value > demoAccount.balance
    ) {
      setError("Enter a valid amount within your available balance.");
      return;
    }

    try {
      // 1. Save the PayNow payment draft
      const draft = saveDraft({
        transferType: "paynow",
        recipientName: recipient.maskedName,
        recipientNumber: recipient.mobile,
        amount: value,
        reference,
      });

      // 2. Calculate risk using simulator triggers
      const riskResult = assess(draft, {
        isNewRecipient: recipient.isNewRecipient,
      });

      // 3. Save the assessment
      saveRiskAssessment(draft, riskResult);

      console.log("PayNow Risk Assessment:", riskResult);

      // 4. Route based on risk
      setError("");

      if (riskResult.level === "low") {
        navigate("/transfer/confirmation");
      } else {
        navigate("/transfer/review");
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="paynow-page">
      <PageBanner
        eyebrow="Transfers & Payments / PayNow"
        title="PayNow Transfer"
        description="Send money securely using a mobile number."
      />

      <div className="paynow-container">
        <Link to="/transfer" className="paynow-back">
          <ArrowLeft size={18} />
          Back to Transfer & Pay
        </Link>

        <form className="paynow-card" onSubmit={submit}>
          <div className="paynow-section-title">
            <Smartphone size={24} />
            <h2>Recipient Details</h2>
          </div>

          <label htmlFor="paynow-mobile">Recipient mobile number</label>

          <div className="paynow-lookup-row">
            <input
              id="paynow-mobile"
              type="tel"
              inputMode="numeric"
              placeholder="e.g. 91234567"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                setRecipient(null);
                setError("");
              }}
              maxLength={12}
              required
            />

            <button
              type="button"
              className="paynow-lookup-button"
              onClick={lookupRecipient}
            >
              Verify
            </button>
          </div>

          {recipient && (
            <div className="paynow-recipient-result">
              <div className="paynow-recipient-heading">
                <ShieldCheck size={22} />
                <strong>PayNow recipient found</strong>
              </div>

              <h3>{recipient.maskedName}</h3>

              <p>
                This is the partially masked registered name returned by the
                simulated PayNow lookup.
              </p>

              <div className="paynow-privacy-note">
                <Info size={18} />
                <span>
                  A masked name does not confirm someone's identity. Verify
                  unexpected payment requests through a trusted channel.
                </span>
              </div>
            </div>
          )}

          <div className="paynow-divider" />

          <div className="paynow-section-title">
            <h2>Transfer Details</h2>
          </div>

          <label htmlFor="paynow-amount">Amount (SGD)</label>

          <input
            id="paynow-amount"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <label htmlFor="paynow-reference">Reference (optional)</label>

          <input
            id="paynow-reference"
            type="text"
            placeholder="What's this payment for?"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            maxLength={120}
          />

          {error && (
            <p className="paynow-error" role="alert">
              {error}
            </p>
          )}

          <div className="paynow-footer">
            <div className="paynow-security-note">
              <ShieldCheck size={18} />
              <span>
                REVENT checks for suspicious activity before you complete a
                transfer.
              </span>
            </div>

            <button type="submit" className="paynow-continue-button">
              Continue
              <ArrowRight size={18} />
            </button>
          </div>
        </form>

        <p className="paynow-demo-notice">
          Demo only. No real PayNow lookup or money transfer occurs.
        </p>
      </div>
    </main>
  );
}
