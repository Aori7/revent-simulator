import { Wifi } from 'lucide-react';
import ReventLogo from '../ReventLogo';

function BankCard({ card }) {
  return (
    <div className="bank-card">
      <div className="bank-card-top">
        <ReventLogo />
        <span className="bank-card-type">DEBIT</span>
      </div>

      <div className="bank-card-chip-row">
        <div className="bank-card-chip">
          <span></span>
        </div>

        <Wifi
          size={30}
          className="bank-card-contactless"
        />
      </div>

      <div className="bank-card-number">
        •••• •••• •••• {card.lastFour}
      </div>

      <div className="bank-card-bottom">
        <div>
          <span className="bank-card-label">
            CARD HOLDER
          </span>
          <strong>{card.holder}</strong>
        </div>

        <div>
          <span className="bank-card-label">
            EXPIRES
          </span>
          <strong>{card.expiry}</strong>
        </div>

        <span className="bank-card-network">
          VISA
        </span>
      </div>
    </div>
  );
}

export default BankCard;