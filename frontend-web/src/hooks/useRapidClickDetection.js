import { useRef, useState } from "react";

export default function useRapidClickDetection({
  threshold = 2,
  windowMs = 5000,
} = {}) {
  const clickTimes = useRef([]);
  const [isRapidClicking, setIsRapidClicking] = useState(false);

  function recordClick() {
    const now = performance.now();

    // Keep only clicks within the configured time window.
    clickTimes.current = [
      ...clickTimes.current.filter(
        (time) => now - time <= windowMs
      ),
      now,
    ];

    const count = clickTimes.current.length;

    if (count >= threshold) {
      setIsRapidClicking(true);
    }

    return {
      count,
      frequency: count / (windowMs / 1000),
      detected: count >= threshold,
    };
  }

  function resetDetection() {
    clickTimes.current = [];
    setIsRapidClicking(false);
  }

  return {
    isRapidClicking,
    recordClick,
    resetDetection,
  };
}
