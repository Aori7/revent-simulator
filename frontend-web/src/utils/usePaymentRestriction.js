import { useSyncExternalStore } from "react";
import { readRestriction } from "./demoSession";

function subscribe(callback) {
  window.addEventListener("payment-restriction", callback);

  return () => {
    window.removeEventListener("payment-restriction", callback);
  };
}

export default function usePaymentRestriction() {
  return useSyncExternalStore(subscribe, readRestriction);
}