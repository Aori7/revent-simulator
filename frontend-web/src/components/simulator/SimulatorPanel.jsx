import {
  PhoneCall,
  MonitorUp,
  ShieldAlert,
  Smartphone,
  Zap,
  RotateCcw,
} from "lucide-react";

import { setRestriction } from "../../utils/demoSession";
import usePaymentRestriction from "../../utils/usePaymentRestriction";

import { useSimulator } from "../../context/SimulatorContext";

const riskOptions = [
  {
    key: "isOnCall",
    label: "Active Phone Call",
    icon: PhoneCall,
  },
  {
    key: "isScreenSharing",
    label: "Screen Sharing",
    icon: MonitorUp,
  },
  {
    key: "hasScamReports",
    label: "Suspicious Recipient",
    icon: ShieldAlert,
  },
  {
    key: "isUnfamiliarDevice",
    label: "Unrecognised Device",
    icon: Smartphone,
  },
  {
    key: "hasRapidTransfers",
    label: "Rapid Transactions",
    icon: Zap,
  },
];

export default function SimulatorPanel() {
  const restriction = usePaymentRestriction();

  const { triggers, toggleTrigger, resetTriggers } = useSimulator();

  return (
    <div className="simulator-panel">
      <div className="simulator-panel-header">
        <h2>Simulation Controls</h2>
        <span className="simulator-demo-badge">DEMO</span>
      </div>

      <p className="simulator-description">
        Simulate different banking conditions to test REVENT's security
        features.
      </p>

      <label htmlFor="payment-restriction">Payment restriction (demo)</label>

      <select
        id="payment-restriction"
        value={restriction}
        onChange={(event) => setRestriction(event.target.value)}
      >
        <option value="">None</option>
        <option>High-risk payment restriction</option>
        <option>Cooling-off period active</option>
      </select>

      <div className="simulator-options">
        {riskOptions.map(({ key, label, icon: Icon }) => (
          <label key={key} className="simulator-option">
            <Icon size={25} />

            <span>{label}</span>

            <input
              type="checkbox"
              checked={triggers[key]}
              onChange={() => toggleTrigger(key)}
              aria-label={label}
            />
          </label>
        ))}
      </div>

      <button type="button" className="simulator-reset" onClick={resetTriggers}>
        <RotateCcw size={18} />
        Reset Risk Triggers
      </button>
    </div>
  );
}
