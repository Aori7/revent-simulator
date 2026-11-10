
import {
  startingPayment,
  demoCustomer,
} from "../data/demoBanking.js";

import {
  draftSignature,
  cleanAnswers,
  defaultAnswers,
} from "./banking.js";

const DRAFT = "revent.demo.paymentDraft";
const REVIEW = "revent.demo.paymentReview";
const SAVED = "revent.demo.savedPayment";

function readJson(key) {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function readDraft() {
  return {
    ...startingPayment,
    ...readJson(DRAFT),
  };
}

export function saveDraft(draft) {
  const old = readDraft();

  if (draftSignature(old) !== draftSignature(draft)) {
    sessionStorage.removeItem(REVIEW);
  }

  sessionStorage.setItem(DRAFT, JSON.stringify(draft));
}

export function readAnswers(draft) {
  const previous = readJson(REVIEW);

  if (
    previous?.customerId === demoCustomer.id &&
    previous?.signature === draftSignature(draft)
  ) {
    return cleanAnswers({
      ...defaultAnswers,
      ...previous.answers,
    });
  }

  return { ...defaultAnswers };
}

export function saveAnswers(draft, answers) {
  sessionStorage.setItem(
    REVIEW,
    JSON.stringify({
      customerId: demoCustomer.id,
      signature: draftSignature(draft),
      answers: cleanAnswers(answers),
    })
  );
}

export function saveReviewForLater(customerId, draft, answers) {
  const record = {
    customerId,
    signature: draftSignature(draft),
    draft,
    answers: cleanAnswers(answers),
    savedAt: new Date().toISOString(),
  };

  sessionStorage.setItem(SAVED, JSON.stringify(record));
  return record;
}

export function getSavedReview(customerId) {
  const review = readJson(SAVED);

  return review?.customerId === customerId ? review : null;
}
