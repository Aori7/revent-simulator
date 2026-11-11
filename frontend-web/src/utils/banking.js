export function formatSGD(amount) {
  return `SGD ${Math.abs(Number(amount)).toLocaleString("en-SG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function maskIdentifier(value) {
  const clean = String(value ?? "").replace(/[^0-9A-Za-z]/g, "");

  if (!clean) return "Not available";

  return "•".repeat(Math.max(4, clean.length - 4)) + clean.slice(-4);
}

export function draftSignature(draft) {
  return JSON.stringify({
    recipientName: (draft.recipientName || "").trim(),
    recipientNumber: (draft.recipientNumber || "").replace(/[\s-]/g, ""),
    amount: Number(draft.amount).toFixed(2),
    reference: (draft.reference || "").trim(),
  });
}

export const defaultAnswers = {
  extraFee: "",
  disclosed: "",
  source: "",
  identity: "",
  urgency: "",
  reviews: "",
  secrecy: "",
};

export function visibleQuestions(answers) {
  return [
    "extraFee",
    ...(answers.extraFee === "yes" ? ["disclosed"] : []),
    "source",
    "identity",
    "urgency",
    ...(["social", "unknown"].includes(answers.source) ? ["reviews"] : []),
    ...(answers.urgency === "yes" ? ["secrecy"] : []),
  ];
}

export function cleanAnswers(answers) {
  const visible = visibleQuestions(answers);

  return Object.fromEntries(
    Object.keys(defaultAnswers).map((key) => [
      key,
      visible.includes(key) ? answers[key] || "" : "",
    ])
  );
}

export function unansweredQuestions(answers) {
  return visibleQuestions(answers).filter((key) => !answers[key]);
}

export function generatePaymentAdvice(answers) {
  const concerns = [];
  const steps = [];

  if (answers.extraFee === "unsure" || answers.disclosed === "unsure") {
    concerns.push(
      "It is unclear whether an additional fee was requested or disclosed."
    );
    steps.push(
      "Compare the request with your original order and check the amount with the seller independently."
    );
  }

  if (answers.extraFee === "yes" && answers.disclosed === "no") {
    concerns.push(
      "The seller requested a fee that was not disclosed before your earlier payment."
    );
    steps.push(
      "Check the original invoice and verify the extra charge through the marketplace before paying."
    );
  }

  if (answers.urgency === "unsure") {
    concerns.push("You are unsure whether you are being pressured to pay.");
    steps.push("Take time to check the request independently.");
  }

  if (["social", "unknown"].includes(answers.source)) {
    concerns.push(
      "The seller was found through a channel where identities can be difficult to verify."
    );
    steps.push(
      "Look up the seller independently rather than using links or contact details they sent you."
    );
  }

  if (answers.reviews === "no" || answers.reviews === "unsure") {
    concerns.push("Independent seller feedback has not been confirmed.");
    steps.push(
      "Check independent reviews and whether the merchant has an established history."
    );
  }

  if (answers.identity !== "yes") {
    concerns.push(
      "The recipient's identity has not been independently verified."
    );
    steps.push(
      "Confirm the recipient and payment details through a trusted channel before paying."
    );
  }

  if (answers.urgency === "yes") {
    concerns.push("Pressure to pay quickly is a common scam warning sign.");
    steps.push(
      "Pause the payment. A legitimate seller should allow time for verification."
    );
  }

  if (answers.secrecy === "yes") {
    concerns.push(
      "Being asked to keep a payment secret is a strong warning sign."
    );
    steps.push(
      "Do not proceed until you speak with someone you trust or contact the merchant independently."
    );
  }

  if (steps.length === 0) {
    steps.push(
      "Confirm the amount, recipient details and order information before proceeding."
    );
  }

  steps.push(
    "If anything feels suspicious, cancel the payment and verify with the bank using its official channels."
  );

  return {
    concerns,
    steps,
    needsExtraCare: concerns.length > 0,
  };
}