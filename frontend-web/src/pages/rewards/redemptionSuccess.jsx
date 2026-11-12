import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import useDemoRewards from '../../hooks/useDemoRewards';
import { getRewardById } from '../../data/rewardsData';

export default function RedemptionSuccess() {
  const { rewards } = useDemoRewards();
  const params = new URLSearchParams(window.location.search);
  const id = params.get('voucher');
  const voucher = rewards.vouchers.find((entry) => entry.id === id);
  const reward = voucher && getRewardById(voucher.catalogId);
  return <main className="rw-page"><div className="rw-container rw-success-wrap">
    <div className="rw-success">
      <span className="rw-success-icon"><CheckCircle2 size={60}/></span>
      {reward ? <><h1>Redemption Successful!</h1>
        <p>Your <strong>{reward.title}</strong> has been added to My Rewards.</p>
        <p className="rw-success-hint">This is a simulated redemption for your REVENT prototype.</p>
      </> : <><h1>Rewards</h1><p>There is no new redemption to display.</p></>}
      <Link className="rw-primary" to={reward ? `/rewards/mine?voucher=${voucher.id}` : '/rewards/mine'}>View My Rewards</Link>
      <Link className="rw-secondary-link" to="/rewards">Back to Rewards page</Link>
    </div>
  </div></main>;
}

