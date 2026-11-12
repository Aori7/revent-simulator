import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/global.css";
import App from "./App.jsx";
import "./css/payment-review-actions.css";
import { SimulatorProvider } from "./context/SimulatorContext";
import { PaymentBehaviourProvider } from "./context/PaymentBehaviourContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SimulatorProvider>
      <PaymentBehaviourProvider>
        <App />
      </PaymentBehaviourProvider>
    </SimulatorProvider>
  </StrictMode>,
);