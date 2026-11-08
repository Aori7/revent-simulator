import { Gift, Sparkles, ArrowRight } from 'lucide-react';
import '../../css/rewards-card.css';

function RewardsCard() {
  const rewardPoints = 2450;

  return (
    <section className="rewards-card">

      {/* Header */}
      <div className="rewards-card-header">
        <h2>Your Rewards</h2>

        <div className="rewards-card-icon">
          <Gift size={32} />
        </div>
      </div>

      {/* Reward Points */}
      <div className="rewards-card-points">
        <p>Available Reward Points</p>

        <h3>
          {rewardPoints.toLocaleString('en-SG')}
          <span> pts</span>
        </h3>
      </div>

      {/* Rewards Information */}
      <div className="rewards-card-highlight">
        <h3>
          <Sparkles size={26} />
          Rewards made simple
        </h3>

        <p>
          Earn points as you bank and discover
          rewards selected for you.
        </p>
      </div>

      {/* Footer */}
      <div className="rewards-card-footer">
        <span>Explore Rewards</span>
        <ArrowRight size={24} />
      </div>

    </section>
  );
}

export default RewardsCard;