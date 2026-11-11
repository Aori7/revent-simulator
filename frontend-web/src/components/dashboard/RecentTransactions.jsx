
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import TransactionItem from "./TransactionItem";
import { demoTransactions } from "../../data/demoBanking";
import "../../css/recent-transactions.css";

function RecentTransactions({ transactions = demoTransactions }) {
  return (
    <section className="recent-transactions">
      <div className="recent-transactions-header">
        <h2>Recent Transactions</h2>

        <Link to="/accounts" className="recent-transactions-link">
          View all <ArrowRight size={22} />
        </Link>
      </div>

      <div className="transactions-list">
        {transactions.slice(0, 5).map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
          />
        ))}

        {transactions.length === 0 && (
          <p>No recent transactions to display.</p>
        )}
      </div>
    </section>
  );
}

export default RecentTransactions;
