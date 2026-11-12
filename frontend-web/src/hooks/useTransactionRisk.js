import { useSimulator } from "../context/SimulatorContext";
import { assessTransactionRisk } from "../utils/riskAssessment";

export default function useTransactionRisk() {
  const { triggers } = useSimulator();

  function assess(transaction, additionalContext = {}) {
    return assessTransactionRisk(transaction, {
      ...triggers,
      ...additionalContext,
    });
  }

  return { assess };
}
