
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  CircleAlert,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";

import AccountCard from "../components/dashboard/AccountCard";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import { demoAccount, demoTransactions } from "../data/demoBanking";
import "../css/banking-flow.css";

function Accounts() {
  const [params, setParams] = useSearchParams();
  const demoMode = params.get("demo") || "normal";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timer);
  }, [demoMode]);

  const changeMode = (value) => {
    setLoading(true);
    setParams(value === "normal" ? {} : { demo: value });
  };

  return (
    <main className="flow-page">
      <div className="flow-shell">
        <div className="flow-page-heading">
          <div>
            <span className="flow-eyebrow">EVERYDAY BANKING</span>
            <h1>My Accounts</h1>
            <p>
              View your account balance and recent transactions.
            </p>
          </div>

          <Link
            to="/transfer"
            className="flow-button flow-button-primary"
          >
            Make a payment <ArrowRight size={18} />
          </Link>
        </div>

        <div className="flow-demo-bar">
          <span>Prototype preview · Simulated account data</span>

          <label htmlFor="account-demo-mode">
            Preview state
          </label>

          <select
            id="account-demo-mode"
            value={demoMode}
            onChange={(e) => changeMode(e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="empty">Empty</option>
            <option value="error">Error</option>
          </select>
        </div>

        {loading ? (
          <div className="flow-panel flow-message" role="status">
            <div className="flow-loader" />
            Loading account details...
          </div>
        ) : demoMode === "error" ? (
          <div className="flow-panel flow-message" role="alert">
            <CircleAlert size={34} />
            <h2>Unable to load your account</h2>
            <p>
              There was a problem retrieving your details
              in this demo scenario.
            </p>

            <button
              type="button"
              className="flow-button flow-button-primary"
              onClick={() => changeMode("normal")}
            >
              <RefreshCcw size={18} /> Try again
            </button>
          </div>
        ) : demoMode === "empty" ? (
          <div className="flow-panel flow-message">
            <h2>No account activity to show</h2>
            <p>
              This demo shows how the screen behaves
              when account data is unavailable.
            </p>

            <button
              type="button"
              className="flow-button flow-button-secondary"
              onClick={() => changeMode("normal")}
            >
              Back to demo account
            </button>
          </div>
        ) : (
          <div className="flow-accounts-grid">
            <div>
              <AccountCard account={demoAccount} />

              <div className="flow-trust-note">
                <ShieldCheck size={19} />
                Your account number is masked for privacy.
              </div>
            </div>

            <RecentTransactions transactions={demoTransactions} />
          </div>
        )}
      </div>
    </main>
  );
}

export default Accounts;
