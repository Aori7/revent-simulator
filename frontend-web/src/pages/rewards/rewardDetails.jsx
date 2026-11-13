import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import useDemoRewards from '../../hooks/useDemoRewards';
import { getRewardById } from '../../data/rewardsData';
import { RewardHeading, RewardVisual } from '../../components/rewardUI';

export default function RewardDetails() {
  const { voucherId } = useParams();
  const reward = getRewardById(voucherId);
  const { rewards, redeem } = useDemoRewards();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  if (!reward) return <main className="rw-page"><div className="rw-container rw-narrow"><RewardHeading title="Reward not found"/>
    <p>This voucher is not available in the demo catalogue.</p><Link to="/rewards/catalog">Browse rewards</Link></div></main>;

  function handleRedeem() {
    const result = redeem(reward.id);
    if (!result.ok) { setError(result.message); return; }
    navigate(`/rewards/success?voucher=${encodeURIComponent(result.voucher.id)}`);
  }

  return <main className="rw-page"><div className="rw-container rw-detail-width">
    <RewardHeading title="Rewards" back="/rewards/catalog"/>
    <article className="rw-detail-card">
      <RewardVisual reward={reward} large/>
      <div className="rw-detail-body">
        <span className="rw-eyebrow">{reward.category}</span>
        <h1>{reward.title}</h1>
        <p className="rw-detail-subtitle">{reward.subtitle}</p>
        <p className="rw-detail-price"><Star size={19}/>{reward.cost} pts</p>
        <hr/>
        <h2>Details</h2>
        <ul>{reward.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
        <details className="rw-terms"><summary>Terms &amp; Conditions</summary><p>{reward.terms}</p></details>
        <p className="rw-detail-balance">Your balance: <strong>{rewards.points.toLocaleString()} pts</strong></p>
        {error && <p role="alert" className="rw-error">{error}</p>}
        <button type="button" onClick={handleRedeem} className="rw-primary rw-redeem-button"
          disabled={rewards.points < reward.cost}>
          {rewards.points < reward.cost ? `Need ${reward.cost - rewards.points} more points` : `Redeem for ${reward.cost} pts`}
        </button>
        <p className="rw-demo-note">Demo redemption only. No real gift card is issued.</p>
      </div>
    </article>
  </div></main>;
}

