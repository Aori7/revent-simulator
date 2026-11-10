import { Landmark, LockKeyhole, ChevronRight, ArrowRight } from 'lucide-react';
import '../../css/account-card.css';

function AccountCard({ account }) {
  const formatMoney = (amount) => {
    return amount.toLocaleString('en-SG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <section className="account-card">

      {/* Card Header */}
      <div className="account-card-header">
        <h2>Your Account</h2>

        <span className="account-card-link">
          View all <ArrowRight size={20} />
        </span>
      </div>

      {/* Account Information */}
      <div className="account-card-info">
        <div className="account-card-icon">
          <Landmark size={30} />
        </div>

        <div className="account-card-identity">
          <h3>{account.type}</h3>
          <p>{account.accountNumber}</p>
        </div>

        <span className="account-card-currency">
          SGD
        </span>
      </div>

      {/* Available Balance */}
      <div className="account-card-balance">
        <p>Available Balance</p>
        <h2>SGD {formatMoney(account.balance)}</h2>
      </div>

      {/* Money Lock */}
      <div className="money-lock-card">
        <div className="money-lock-header">
          <h3>
            <LockKeyhole size={25} />
            Money Lock
          </h3>

          <span className="account-card-link">
            Manage
          </span>
        </div>

        <div className="money-lock-amount">
          <span>Amount Locked</span>
          <strong>
            SGD {formatMoney(account.lockedAmount)}
          </strong>
        </div>

        <p>
          Funds in Money Lock are kept separate
          from your available balance.
        </p>
      </div>

      {/* Footer */}
      <div className="account-card-footer">
        <span>Account details</span>
        <ChevronRight size={24} />
      </div>

    </section>
  );
}

export default AccountCard;