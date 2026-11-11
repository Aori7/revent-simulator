import {
  PhoneCall,
  MonitorUp,
  ShieldAlert,
  Smartphone,
  Zap,
} from "lucide-react";

import { setRestriction } from "../../utils/demoSession";
import usePaymentRestriction from "../../utils/usePaymentRestriction";

export default function SimulatorPanel() {
  const restriction = usePaymentRestriction();

  return (
    <div className="simulator-panel">
      <div className="simulator-panel-header">
        <h2>Simulation Controls</h2>
        <span className="simulator-demo-badge">DEMO</span>
      </div>

      <p className="simulator-description">
        Simulate different banking conditions to test REVENT's security features.
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
        <div className="simulator-option">
          <PhoneCall size={25} />
          <span>Active Phone Call</span>
        </div>

        <div className="simulator-option">
          <MonitorUp size={25} />
          <span>Screen Sharing</span>
        </div>

        <div className="simulator-option">
          <ShieldAlert size={25} />
          <span>Suspicious Recipient</span>
        </div>

        <div className="simulator-option">
          <Smartphone size={25} />
          <span>Unrecognised Device</span>
        </div>

        <div className="simulator-option">
          <Zap size={25} />
          <span>Rapid Transactions</span>
        </div>
      </div>
    </div>
  );
}