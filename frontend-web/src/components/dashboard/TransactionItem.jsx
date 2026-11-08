import {ShoppingCart,ArrowUpRight,ArrowDownLeft,Receipt,} from "lucide-react";

const transactionIcons = {
    shopping: ShoppingCart,
    transfer: ArrowUpRight,
    incoming: ArrowDownLeft,
    bill: Receipt,
};

function TransactionItem({ transaction }) {
  const Icon = transactionIcons[transaction.icon] || Receipt;

  const isIncoming = transaction.amount > 0;

  const formattedAmount = Math.abs(transaction.amount).toLocaleString("en-SG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="transaction-item">
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
        className={`transaction-amount ${isIncoming ? "incoming" : "outgoing"}`}
      >
        {isIncoming ? "+" : "-"}SGD {formattedAmount}
      </div>
    </div>
  );
}

export default TransactionItem;
