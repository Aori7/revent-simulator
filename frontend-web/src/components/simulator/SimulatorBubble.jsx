
import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

import SimulatorPanel from './SimulatorPanel';
import '../../css/simulator.css';

function SimulatorBubble() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="simulator-container">

      {isOpen && <SimulatorPanel />}

      <button
        type="button"
        className="simulator-bubble"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={
          isOpen ? 'Close simulator' : 'Open simulator'
        }
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X size={30} />
        ) : (
          <SlidersHorizontal size={30} />
        )}
      </button>

    </div>
  );
}

export default SimulatorBubble;
