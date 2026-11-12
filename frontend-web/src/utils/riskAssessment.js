export function assessTransactionRisk(transaction, context = {}) {
  let score = 0;
  const reasons = [];

  function addRisk(condition, points, reason) {
    if (condition) {
      score += points;
      reasons.push(reason);
    }
  }

  const amount = Number(transaction.amount);

  addRisk(context.isNewRecipient === true, 20, "Payment to a new recipient");

  addRisk(
    Number.isFinite(amount) && amount > 1000,
    20,
    "Large transaction amount",
  );

  addRisk(
    context.hasScamReports === true,
    40,
    "Recipient has reported scam activity",
  );

  addRisk(
    context.isUnfamiliarDevice === true,
    15,
    "Payment initiated from an unfamiliar device",
  );

//   addRisk(context.isOnCall === true, 25, "Active phone call during payment");

  addRisk(
    context.isScreenSharing === true,
    25,
    "Screen sharing active during payment",
  );

  addRisk(
    context.hasRapidTransfers === true,
    15,
    "Multiple transfers in a short period",
  );

  score = Math.min(score, 100);

  const level = score >= 60 ? "high" : score >= 30 ? "medium" : "low";

  return {
    score,
    level,
    reasons,
    requiresSafetyReview: level === "high",
  };
}
