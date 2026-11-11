import {
  ShieldCheck,
  CheckCircle2,
  Bot,
  MessageCircle
} from 'lucide-react';

import '../../css/security-card.css';

function SecurityCard({ onOpenChat }) {
  return (
    <section className="security-card">

      {/* Security Header */}
      <div className="security-card-header">
        <div className="security-card-icon">
          <ShieldCheck size={34} />
        </div>

        <div className="security-card-heading">
          <h2>Your Security</h2>

          <p className="security-card-status">
            <CheckCircle2 size={20} />
            Security features enabled
          </p>
        </div>
      </div>

      {/* Security Description */}
      <p className="security-card-description">
        Stay one step ahead of scams with smarter
        transaction protection and helpful
        security guidance.
      </p>

      {/* AI Assistant Information */}
      <div className="security-card-assistant">
        <h3>
          <Bot size={28} />
          REVENT AI Assistant
        </h3>

        <p>
          Unsure about a payment or suspicious
          message? Ask our security assistant
          for guidance.
        </p>
      </div>

      {/* Chat Button */}
      <button
        type="button"
        className="security-card-button"
        onClick={onOpenChat}
        disabled={!onOpenChat}
      >
        <MessageCircle size={24} />
        Chat with AI Assistant
      </button>

    </section>
  );
}

export default SecurityCard;