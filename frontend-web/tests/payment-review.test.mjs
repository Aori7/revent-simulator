import { beforeEach, test } from "node:test";
import assert from "node:assert/strict";

import { demoCustomer, startingPayment } from "../src/data/demoBanking.js";
import {
  cleanAnswers,
  generatePaymentAdvice,
  unansweredQuestions,
} from "../src/utils/banking.js";
import {
  activeDraft,
  cancelPayment,
  canConfirm,
  completeReview,
  getSavedReview,
  invalidateReview,
  readAnswers,
  readRestriction,
  saveAnswers,
  saveDraft,
  saveReviewForLater,
  setRestriction,
} from "../src/utils/demoSession.js";

const standard = {
  extraFee: "no",
  source: "retailer",
  identity: "yes",
  urgency: "no",
};

const owner = demoCustomer.id;
let draft;

beforeEach(() => {
  const values = new Map();

  globalThis.sessionStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
  };

  globalThis.window = new EventTarget();
  sessionStorage.setItem("reventDemoLogin", "true");
  draft = saveDraft(startingPayment);
});

test("the extra-fee follow-up appears only for Yes", () => {
  assert.deepEqual(
    unansweredQuestions({ ...standard, extraFee: "yes" }),
    ["disclosed"]
  );

  for (const extraFee of ["no", "unsure"]) {
    const cleaned = cleanAnswers({ ...standard, extraFee, disclosed: "no" });

    assert.equal(cleaned.disclosed, "");
    assert.deepEqual(unansweredQuestions(cleaned), []);
  }
});

test("pressure and social sources require their follow-ups", () => {
  const answers = { ...standard, urgency: "yes", source: "social" };

  assert.deepEqual(unansweredQuestions(answers), ["reviews", "secrecy"]);
  assert.throws(() => completeReview(draft, answers));
  assert.equal(canConfirm(), false);
  assert.equal(cleanAnswers({ ...standard, secrecy: "yes" }).secrecy, "");
});

test("the summary explains undisclosed fees, pressure and uncertainty", () => {
  const advice = generatePaymentAdvice({
    ...standard,
    extraFee: "yes",
    disclosed: "no",
    urgency: "yes",
  });

  assert.match(advice.concerns.join(" "), /not disclosed/);
  assert.match(advice.concerns.join(" "), /Pressure/);

  const unsure = generatePaymentAdvice({ ...standard, extraFee: "unsure" });

  assert.match(unsure.concerns.join(" "), /unclear/);
  assert.equal(generatePaymentAdvice(standard).needsExtraCare, false);
});

test("only a completed current review can open confirmation", () => {
  assert.equal(canConfirm(), false);

  completeReview(draft, standard);
  assert.equal(canConfirm(), true);

  saveAnswers(draft, { ...standard, urgency: "yes" });
  assert.equal(canConfirm(), false);
});

for (const [field, value] of Object.entries({
  recipientName: "Other seller",
  recipientNumber: "81234567",
  amount: "22.50",
})) {
  test(`changing ${field} invalidates the review even after reverting`, () => {
    saveAnswers(draft, standard);
    completeReview(draft, standard);

    const changed = saveDraft({ ...draft, [field]: value });

    assert.equal(changed.version, draft.version + 1);
    assert.equal(canConfirm(), false);
    assert.equal(readAnswers(changed).source, "");
    assert.throws(() => completeReview(draft, standard));

    saveDraft(draft);
    assert.equal(canConfirm(), false);
  });
}

test("an equivalent stored amount preserves completion until an edit starts", () => {
  completeReview(draft, standard);
  saveDraft({ ...draft, amount: Number(draft.amount) });

  assert.equal(canConfirm(), true);

  invalidateReview();
  assert.equal(canConfirm(), false);
});

for (const reason of [
  "High-risk payment restriction",
  "Cooling-off period active",
]) {
  test(`${reason} blocks confirmation even after a completed review`, () => {
    completeReview(draft, standard);
    setRestriction(reason);

    assert.equal(canConfirm(), false);
    assert.throws(() => completeReview(draft, standard));
    assert.equal(readRestriction(), reason);
  });
}

test("save and resume preserves the draft version and unresolved questions", () => {
  const saved = saveReviewForLater(owner, draft, {
    ...standard,
    extraFee: "yes",
  });

  assert.equal(saved.version, draft.version);
  assert.equal(saved.id, draft.id);
  assert.deepEqual(saved.unresolvedQuestions, ["disclosed"]);

  const resumed = saveDraft(getSavedReview(owner).draft);
  saveAnswers(resumed, saved.answers);

  assert.equal(readAnswers(resumed).extraFee, "yes");
  assert.equal(canConfirm(), false);
});

test("confirmed cancellation clears the draft, saved review and completion", async () => {
  saveAnswers(draft, standard);
  saveReviewForLater(owner, draft, standard);
  completeReview(draft, standard);

  await cancelPayment(draft);

  assert.equal(activeDraft(), null);
  assert.equal(getSavedReview(owner), null);
  assert.equal(canConfirm(), false);

  const next = saveDraft(startingPayment);

  assert.notEqual(next.id, draft.id);
  assert.equal(readAnswers(next).source, "");

  // A stale cancellation request must not cancel the next payment.
  await assert.rejects(cancelPayment(draft));
  assert.deepEqual(activeDraft(), next);
});

test("a failed cancellation can be retried", async () => {
  const remove = sessionStorage.removeItem;

  sessionStorage.removeItem = () => {
    throw new Error("Storage failure");
  };

  await assert.rejects(cancelPayment(draft), /Storage failure/);
  assert.deepEqual(activeDraft(), draft);

  sessionStorage.removeItem = remove;
  await cancelPayment(draft);

  assert.equal(activeDraft(), null);
});

test("foreign customers and signed-out sessions cannot use the review", async () => {
  const foreign = { ...draft, customerId: "another-customer" };

  saveAnswers(draft, standard);

  assert.equal(readAnswers(foreign).source, "");
  assert.throws(() => completeReview(foreign, standard));
  await assert.rejects(cancelPayment(foreign));

  saveReviewForLater(owner, draft, standard);
  assert.equal(getSavedReview(foreign.customerId), null);

  completeReview(draft, standard);
  sessionStorage.removeItem("reventDemoLogin");

  assert.equal(activeDraft(), null);
  assert.equal(canConfirm(), false);
  assert.equal(getSavedReview(owner), null);
  await assert.rejects(cancelPayment(draft));
});

test("old completions, foreign drafts and invalid amounts cannot unlock confirmation", () => {
  sessionStorage.setItem(
    "revent.demo.completedReview",
    JSON.stringify({ customerId: owner, draft, answers: standard })
  );

  assert.equal(canConfirm(), false);

  sessionStorage.setItem(
    "revent.demo.paymentDraft",
    JSON.stringify({ ...draft, customerId: "other" })
  );

  assert.equal(activeDraft(), null);

  for (const amount of ["0", "0.001", "7000", "Infinity"]) {
    assert.throws(() => saveDraft({ ...startingPayment, amount }));
  }
});