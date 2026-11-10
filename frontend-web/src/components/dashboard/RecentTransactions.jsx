import { ArrowRight } from 'lucide-react';
import TransactionItem from './TransactionItem';

import '../../css/recent-transactions.css';

function RecentTransactions() {

  // Temporary transaction data
  const transactions = [
    {
      id: 1,
      name: 'NTUC FairPrice',
      type: 'Card Payment',
      date: '7 Nov 2026',
      amount: -42.80,
      icon: 'shopping'
    },
    {
      id: 2,
      name: 'Alex Tan',
      type: 'PayNow Transfer',
      date: '6 Nov 2026',
      amount: -150.00,
      icon: 'transfer'
    },
    {
      id: 3,
      name: 'Salary Credit',
      type: 'Bank Transfer',
      date: '5 Nov 2026',
      amount: 2500.00,
      icon: 'incoming'
    },
    {
      id: 4,
      name: 'SP Services',
      type: 'Bill Payment',
      date: '4 Nov 2026',
      amount: -85.60,
      icon: 'bill'
    }
  ];

  return (
    <section className="recent-transactions">

      <div className="recent-transactions-header">
        <h2>Recent Transactions</h2>

        <span className="recent-transactions-link">
          View all <ArrowRight size={22} />
        </span>
      </div>

      <div className="transactions-list">
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
          />
        ))}
      </div>

    </section>
  );
}

export default RecentTransactions;