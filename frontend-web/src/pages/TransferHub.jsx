import { Link } from "react-router-dom";
import {
  Smartphone,
  Landmark,
  QrCode,
  CalendarClock,
  Users,
  History,
  ArrowRight,
  ShoppingCart,
} from "lucide-react";
import PageBanner from "../components/PageBanner";
import "../css/transfer-hub.css";

const transferOptions = [
  {
    title: "PayNow",
    description: "Send money using a mobile number, NRIC/FIN or UEN.",
    icon: Smartphone,
    path: "/transfer/paynow",
  },
  {
    title: "Bank Transfer",
    description: "Transfer funds to another bank account.",
    icon: Landmark,
    path: "/transfer/bank",
  },
  {
    title: "Scan & Pay",
    description: "Make payments using a QR code.",
    icon: QrCode,
    path: "/transfer/qr",
  },
  {
    title: "Scheduled Transfer",
    description: "Schedule a payment for a future date.",
    icon: CalendarClock,
    path: "/transfer/scheduled",
  },
  {
    title: "Manage Recipients",
    description: "Add, view and manage saved recipients.",
    icon: Users,
    path: "/transfer/recipients",
  },
  {
    title: "Transaction History",
    description: "View your previous transfers and payments.",
    icon: History,
    path: "/transfer/history",
  },
//   temporary for testing joelle's safety review flow
  {
    title: "E-commerce Payment",
    description: "Try the existing payment and safety review flow.",
    icon: ShoppingCart,
    path: "/transfer/ecommerce",
  },
];

export default function TransferHub() {
  return (
    <main className="transfer-hub-page">
      <PageBanner
        eyebrow="Everyday Banking / Transfers & Payments"
        title="Transfer & Pay"
        description="Move your money securely, wherever it needs to go."
      />

      <div className="transfer-hub-content">
        <div className="transfer-hub-heading">
          <h2>What would you like to do?</h2>
          <p>Choose a payment method to get started.</p>
        </div>

        <div className="transfer-hub-grid">
          {transferOptions.map((option) => {
            const Icon = option.icon;

            return (
              <Link
                key={option.title}
                to={option.path}
                className="transfer-hub-card"
              >
                <div className="transfer-hub-icon">
                  <Icon size={28} />
                </div>

                <h3>{option.title}</h3>
                <p>{option.description}</p>

                <span className="transfer-hub-card-action">
                  Get started
                  <ArrowRight size={18} />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="transfer-hub-notice">
          <strong>Stay protected with REVENT</strong>
          <p>
            Our transaction risk assessment helps identify suspicious activity
            before you complete a transfer.
          </p>
        </div>
      </div>
    </main>
  );
}
