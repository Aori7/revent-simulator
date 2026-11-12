import { activeDraft } from "./demoSession";
import { draftSignature } from "./banking";

const RISK_KEY = "revent.demo.transactionRisk";

export function saveRiskAssessment(draft, result) {
  const record = {
    customerId: draft.customerId,
    draftId: draft.id,
    version: draft.version,
    signature: draftSignature(draft),
    result,
    assessedAt: new Date().toISOString(),
  };

  sessionStorage.setItem(RISK_KEY, JSON.stringify(record));

  return record;
}

export function getRiskAssessment() {
  const draft = activeDraft();

  if (!draft) return null;

  try {
    const record = JSON.parse(sessionStorage.getItem(RISK_KEY));

    if (
      record?.customerId !== draft.customerId ||
      record?.draftId !== draft.id ||
      record?.version !== draft.version ||
      record?.signature !== draftSignature(draft)
    ) {
      return null;
    }

    return record.result;
  } catch {
    return null;
  }
}

export function clearRiskAssessment() {
  sessionStorage.removeItem(RISK_KEY);
}
