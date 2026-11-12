import { createContext, useContext, useState } from "react";

const SimulatorContext = createContext(null);

const initialTriggers = {
  isOnCall: false,
  isScreenSharing: false,
  hasScamReports: false,
  isUnfamiliarDevice: false,
  hasRapidTransfers: false,
};

export function SimulatorProvider({ children }) {
  const [triggers, setTriggers] = useState(initialTriggers);

  function toggleTrigger(name) {
    if (!(name in initialTriggers)) return;

    setTriggers((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));
  }

  function resetTriggers() {
    setTriggers({ ...initialTriggers });
  }

  return (
    <SimulatorContext.Provider
      value={{
        triggers,
        toggleTrigger,
        resetTriggers,
      }}
    >
      {children}
    </SimulatorContext.Provider>
  );
}

export function useSimulator() {
  const context = useContext(SimulatorContext);

  if (!context) {
    throw new Error("useSimulator must be used inside SimulatorProvider");
  }

  return context;
}
