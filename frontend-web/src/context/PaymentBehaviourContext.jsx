
import {
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

const PaymentBehaviourContext = createContext(null);

const CLICK_THRESHOLD = 5;
const TIME_WINDOW = 3000;

export function PaymentBehaviourProvider({ children }) {
  const clickTimes = useRef([]);

  const [rapidClickDetected, setRapidClickDetected] =
    useState(false);

  const [clickFrequency, setClickFrequency] = useState(0);

  function recordPaymentClick() {
    const now = performance.now();

    // Keep only clicks within the last 3 seconds
    clickTimes.current = [
      ...clickTimes.current.filter(
        (time) => now - time <= TIME_WINDOW
      ),
      now,
    ];

    const count = clickTimes.current.length;
    const frequency = count / (TIME_WINDOW / 1000);
    const detected = count >= CLICK_THRESHOLD;

    // DEBUG: Check whether clicks are being recorded
    console.log("RAPID CLICK DEBUG:", {
      count,
      frequency,
      threshold: CLICK_THRESHOLD,
      detected,
    });

    setClickFrequency(frequency);

    if (detected) {
      setRapidClickDetected(true);
    }

    return { count, frequency, detected };
  }

  function resetRapidClickDetection() {
    clickTimes.current = [];
    setRapidClickDetected(false);
    setClickFrequency(0);
  }

  return (
    <PaymentBehaviourContext.Provider
      value={{
        rapidClickDetected,
        clickFrequency,
        recordPaymentClick,
        resetRapidClickDetection,
      }}
    >
      {children}
    </PaymentBehaviourContext.Provider>
  );
}

export function usePaymentBehaviour() {
  const context = useContext(PaymentBehaviourContext);

  if (!context) {
    throw new Error(
      "usePaymentBehaviour must be used inside PaymentBehaviourProvider"
    );
  }

  return context;
}
