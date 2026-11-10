
import {
  ShoppingCart,
  ArrowUpRight,
  ArrowDownLeft,
  Receipt,
  ChevronRight,
} from "lucide-react";

import { Link } from "react-router-dom";
import { formatSGD } from "../../utils/banking";

const transactionIcons = {
  shopping: ShoppingCart,
  transfer: ArrowUpRight,
  incoming: ArrowDownLeft,
  bill: Receipt,
};

function TransactionItem({ transaction }) {
  const Icon = transactionIcons[transaction.icon] || Receipt;
  const isIncoming = transaction.amount > 0;

  return (
    <Link
      className="transaction-item"
      to={`/transactions/${encodeURIComponent(transaction.id)}`}
      aria-label={`View details for ${transaction.name}`}
    >
      <div className="transaction-icon">
        <Icon size={28} />
      </div>

      <div className="transaction-info">
        <h3>{transaction.name}</h3>
        <p>
          {transaction.type} · {transaction.date}
        </p>
      </div>

      <div
        className={`transaction-amount ${
          isIncoming ? "incoming" : "outgoing"
        }`}
      >
        {isIncoming ? "+" : "−"}
        {formatSGD(transaction.amount)}
      </div>

      <ChevronRight size={19} aria-hidden="true" />
    </Link>
  );
}

export default TransactionItem;
