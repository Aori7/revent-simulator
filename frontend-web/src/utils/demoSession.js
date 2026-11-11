import {
  startingPayment,
  demoCustomer,
  demoAccount,
} from "../data/demoBanking.js";

import {
  draftSignature,
  cleanAnswers,
  defaultAnswers,
  unansweredQuestions,
} from "./banking.js";

const DRAFT = "revent.demo.paymentDraft";
const REVIEW = "revent.demo.paymentReview";
const SAVED = "revent.demo.savedPayment";
const COMPLETED = "revent.demo.completedReview";
const RESTRICTION = "revent.demo.paymentRestriction";

function readJson(key) {
  try {
    return JSON.parse(sessionStorage.getItem(key));
  } catch {
    return null;
  }
}

function signedIn() {
  return sessionStorage.getItem("reventDemoLogin") === "true";
}

function owned(record) {
  return signedIn() && record?.customerId === demoCustomer.id;
}

export function validPayment(draft) {
  return (
    typeof draft?.recipientName === "string" &&
    Boolean(draft.recipientName.trim()) &&
    /^\d{8,16}$/.test(String(draft.recipientNumber).replace(/[\s-]/g, "")) &&
    /^\d+(\.\d{1,2})?$/.test(String(draft.amount)) &&
    Number(draft.amount) > 0 &&
    Number(draft.amount) <= demoAccount.balance
  );
}

export function activeDraft() {
  const draft = readJson(DRAFT);

  if (!owned(draft) || !draft.id || !draft.version || !validPayment(draft)) {
    return null;
  }

  return draft;
}

export function readDraft() {
  const draft = readJson(DRAFT);

  // The original simulator saved drafts without an ID or customer ID.
  // Their details can still be opened in the transfer form.
  const isLegacyDraft = draft && !draft.customerId && !draft.id;

  if (owned(draft) || isLegacyDraft) {
    return { ...startingPayment, ...draft };
  }

  return { ...startingPayment };
}

function matches(record, draft) {
  return (
    owned(record) &&
    Boolean(draft) &&
    record.id === draft.id &&
    record.version === draft.version &&
    record.signature === draftSignature(draft)
  );
}

function requireActive(draft) {
  if (!owned(draft)) {
    throw new Error("You do not have access to this payment.");
  }

  const record = {
    ...draft,
    signature: draftSignature(draft),
  };

  if (!matches(record, activeDraft())) {
    throw new Error(
      "This payment has changed or is no longer available. Return to Transfer & Pay."
    );
  }
}

export function invalidateReview() {
  sessionStorage.removeItem(COMPLETED);
  sessionStorage.removeItem(REVIEW);
}

export function saveDraft(form) {
  if (!signedIn() || !validPayment(form)) {
    throw new Error("Enter valid payment details.");
  }

  const old = activeDraft();
  const changed = !old || draftSignature(old) !== draftSignature(form);

  if (changed) invalidateReview();

  const draft = {
    ...form,
    customerId: demoCustomer.id,
    id: old?.id || crypto.randomUUID(),
    version: (old?.version || 0) + Number(changed),
  };

  sessionStorage.setItem(DRAFT, JSON.stringify(draft));
  return draft;
}

export function readAnswers(draft) {
  const previous = readJson(REVIEW);

  if (owned(draft) && matches(previous, draft)) {
    return cleanAnswers(previous.answers);
  }

  return { ...defaultAnswers };
}

function reviewRecord(draft, answers) {
  requireActive(draft);

  return {
    customerId: draft.customerId,
    id: draft.id,
    version: draft.version,
    signature: draftSignature(draft),
    answers: cleanAnswers(answers),
  };
}

export function saveAnswers(draft, answers) {
  const record = reviewRecord(draft, answers);

  sessionStorage.removeItem(COMPLETED);
  sessionStorage.setItem(REVIEW, JSON.stringify(record));
}

export function saveReviewForLater(customerId, draft, answers) {
  if (customerId !== demoCustomer.id) {
    throw new Error("Access denied.");
  }

  const record = {
    ...reviewRecord(draft, answers),
    draft,
    unresolvedQuestions: unansweredQuestions(answers),
    savedAt: new Date().toISOString(),
  };

  sessionStorage.setItem(SAVED, JSON.stringify(record));
  return record;
}

export function getSavedReview(customerId) {
  const saved = readJson(SAVED);

  if (
    !owned(saved) ||
    saved.customerId !== customerId ||
    !validPayment(saved.draft)
  ) {
    return null;
  }

  return saved;
}

export function readRestriction() {
  return sessionStorage.getItem(RESTRICTION) || "";
}

export function setRestriction(value) {
  if (value) {
    sessionStorage.setItem(RESTRICTION, value);
  } else {
    sessionStorage.removeItem(RESTRICTION);
  }

  window.dispatchEvent(new Event("payment-restriction"));
}

export function completeReview(draft, answers) {
  const record = reviewRecord(draft, answers);

  if (unansweredQuestions(record.answers).length > 0) {
    throw new Error("Answer all visible questions.");
  }

  const restriction = readRestriction();

  if (restriction) {
    throw new Error(restriction);
  }

  sessionStorage.setItem(COMPLETED, JSON.stringify(record));
}

export function canConfirm() {
  return !readRestriction() && Boolean(matches(readJson(COMPLETED), activeDraft()));
}

// Shared cancellation service for the browser-session simulator.
export async function cancelPayment(draft) {
  requireActive(draft);

  const saved = getSavedReview(draft.customerId);

  if (saved && (!saved.draft.id || saved.draft.id === draft.id)) {
    sessionStorage.removeItem(SAVED);
  }

  invalidateReview();
  sessionStorage.removeItem(DRAFT);
}