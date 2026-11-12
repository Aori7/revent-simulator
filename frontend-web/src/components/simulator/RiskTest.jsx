import { useState } from "react";
import useTransactionRisk from "../../hooks/useTransactionRisk";
import { useSimulator } from "../../context/SimulatorContext";

export default function RiskTest() {
  const { assess } = useTransactionRisk();
  const [result, setResult] = useState(null);
  const { triggers } = useSimulator();

    console.log("Current simulator triggers:", triggers);

  function testRisk() {
    const transaction = {
      recipientName: "Alex Tan",
      recipientNumber: "91234567",
      amount: 2500,
    };

    const riskResult = assess(transaction, {
      isNewRecipient: true,
    });

    setResult(riskResult);
  }

  return (
    <div style={{ padding: "24px" }}>
      <h2>Transaction Risk Test</h2>
    <h3>Simulator State:</h3>
    <pre>{JSON.stringify(triggers, null, 2)}</pre>
      <p>
        Test payment: SGD 2,500 to a new recipient.
      </p>

      <button type="button" onClick={testRisk}>
        Assess Transaction
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Risk Score: {result.score}/100</h3>
          <p>Risk Level: {result.level}</p>

          <h4>Risk Indicators:</h4>
          <ul>
            {result.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
