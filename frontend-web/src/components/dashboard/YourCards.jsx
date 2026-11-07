import { ArrowRight, CreditCard } from 'lucide-react';
import BankCard from './BankCard';
import '../../css/bank-card.css';

function YourCards() {
  const card = {
    id: 1,
    name: 'REVENT Debit Card',
    holder: 'KIKI TAN',
    lastFour: '4821',
    expiry: '08/29',
    status: 'Active'
  };

  return (
    <section className="your-cards">
      <div className="your-cards-header">
        <h2>Your Cards</h2>

        <span className="your-cards-link">
          View all <ArrowRight size={20} />
        </span>
      </div>

      <BankCard card={card} />

      <div className="your-cards-footer">
        <div className="your-cards-details">
          <CreditCard size={25} />

          <span>{card.name}</span>
        </div>

        <span className="your-cards-status">
          {card.status}
        </span>
      </div>
    </section>
  );
}

export default YourCards;