
import {
  Landmark,
  LockKeyhole,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import { maskIdentifier } from "../../utils/banking";
import "../../css/account-card.css";

function AccountCard({ account }) {
  const formatMoney = (amount) =>
    amount.toLocaleString("en-SG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <section className="account-card">
      <div className="account-card-header">
        <h2>Your Account</h2>

        <Link to="/accounts" className="account-card-link">
          View all <ArrowRight size={20} />
        </Link>
      </div>

      <div className="account-card-info">
        <div className="account-card-icon">
          <Landmark size={30} />
        </div>

        <div className="account-card-identity">
          <h3>{account.type}</h3>
          <p>{maskIdentifier(account.accountNumber)}</p>
        </div>

        <span className="account-card-currency">SGD</span>
      </div>

      <div className="account-card-balance">
        <p>Available Balance</p>
        <h2>SGD {formatMoney(account.balance)}</h2>
      </div>

      <div className="money-lock-card">
        <div className="money-lock-header">
          <h3>
            <LockKeyhole size={25} />
            Money Lock
          </h3>
        </div>

        <div className="money-lock-amount">
          <span>Amount Locked</span>
          <strong>SGD {formatMoney(account.lockedAmount)}</strong>
        </div>

        <p>
          Funds in Money Lock are kept separate
          from your available balance.
        </p>
      </div>

      <Link to="/accounts" className="account-card-footer">
        <span>Account details</span>
        <ChevronRight size={24} />
      </Link>
    </section>
  );
}

export default AccountCard;
