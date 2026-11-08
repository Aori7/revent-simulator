
import {PhoneCall,MonitorUp,ShieldAlert,Smartphone,Zap} from 'lucide-react';

function SimulatorPanel() {
  return (
    <div className="simulator-panel">
      <div className="simulator-panel-header">
        <h2>Simulation Controls</h2>
        <span className="simulator-demo-badge">DEMO</span>
      </div>

      <p className="simulator-description">
        Simulate different banking conditions to test
        REVENT's security features.
      </p>

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

export default SimulatorPanel;
