import { useLayoutEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { CircleAlert } from "lucide-react";

import PaymentReviewContent from "./PaymentReviewContent";
import { activeDraft } from "../utils/demoSession";
import { getRiskAssessment } from "../utils/riskSession";
import "../css/payment-review-popup.css";

export default function PaymentReview() {
  const navigate = useNavigate();
  const dialogRef = useRef(null);
  const contentRef = useRef(null);

  const draft = activeDraft();
  const draftId = draft?.id;
  const draftVersion = draft?.version;

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!draftId || !dialog) return;

    // Open before the browser paints the review page. A native modal
    // keeps clicks and keyboard focus inside the popup while it is open.
    if (!dialog.open) dialog.showModal();

    return () => {
      if (dialog.open) dialog.close();
    };
  }, [draftId, draftVersion]);

  if (!draft) return <Navigate to="/transfer" replace />;

  const assessment = getRiskAssessment();
  const reasons = Array.isArray(assessment?.reasons)
    ? assessment.reasons
    : [];

  function openReview() {
    dialogRef.current?.close();

    // Start at the review heading, even if the transfer form was scrolled.
    const heading = contentRef.current?.querySelector("h1");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
      heading.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }

  function editPayment() {
    navigate("/transfer");
  }

  return (
    <>
      <div ref={contentRef}>
        <PaymentReviewContent />
      </div>

      <dialog
        ref={dialogRef}
        className="payment-review-popup"
        aria-labelledby="payment-review-popup-title"
        aria-describedby="payment-review-popup-description"
        onCancel={(event) => {
          // Escape returns to editing, so it never advances the payment.
          event.preventDefault();
          editPayment();
        }}
      >
        <div className="payment-review-popup__body">
          <span className="payment-review-popup__icon" aria-hidden="true">
            <CircleAlert size={34} strokeWidth={2.3} />
          </span>

          <h2 id="payment-review-popup-title">Pause before you pay</h2>

          <p id="payment-review-popup-description">
            {reasons.length > 0
              ? "Take a moment to check this payment. Here’s why you’re seeing this review."
              : "Take a moment to check the recipient and amount before continuing."}
          </p>

          {reasons.length > 0 && (
            <ul className="payment-review-popup__reasons">
              {reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          )}

          <div className="payment-review-popup__actions">
            <button
              type="button"
              className="payment-review-popup__primary"
              onClick={openReview}
            >
              Review payment
            </button>

            <button
              type="button"
              className="payment-review-popup__secondary"
              onClick={editPayment}
            >
              Edit payment details
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}