import { getStatus } from '../../utils/rewardsHelpers';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight, Gift, ShieldCheck, Sparkles } from 'lucide-react';
import useDemoRewards from '../../hooks/useDemoRewards';
import { rewardCatalog } from '../../data/rewardsData';
import { RewardHeading, PointsStrip, MiniVoucher, CatalogTile, SectionTitle } from '../../components/rewardUI';

function RewardsHome() {
  const { rewards } = useDemoRewards();
  const available = rewards.vouchers.filter((voucher) => getStatus(voucher) === 'available');
  return (
    <main className="rw-page"><div className="rw-container">
      <RewardHeading title="Rewards" back={null}/>
      <section className="rw-hero">
        <div><span className="rw-eyebrow">REVENT REWARDS</span>
          <h2>Learn | Practise | Stay Safe</h2>
          <p>Build your scam awareness and earn rewards along the way.</p>
        </div>
        <div className="rw-hero-gift" aria-hidden="true"><Gift size={62} strokeWidth={1.6}/><Sparkles size={23}/></div>
      </section>
      <PointsStrip points={rewards.points}/>
      <div className="rw-dashboard-grid">
        <section className="rw-section">
          <SectionTitle path="/rewards/mine">My Rewards</SectionTitle>
          <div className="rw-mini-vouchers">
            {available.length ? available.slice(0, 3).map((voucher) =>
              <MiniVoucher key={voucher.id} voucher={voucher} to={`/rewards/mine?voucher=${voucher.id}`}/>
            ) : <div className="rw-empty-inline">No available vouchers yet. <Link to="/rewards/catalog">Explore rewards</Link></div>}
          </div>
        </section>
        <section className="rw-section">
          <SectionTitle path="/rewards/points">Earn Points</SectionTitle>

            <div className="rw-earn-list">

            {/* Complete a Learning Card */}
            <Link className="rw-earn-item" to="/education">
                <span className="rw-earn-icon">
                <BookOpen size={24} />
                </span>

                <span>
                <strong>Complete a learning card</strong>
                <small>Learn how to spot an AI-powered scam</small>
                </span>

                <span className="rw-earn-pill">+10 pts</span>
            </Link>

            {/* Check Scam Readiness */}
            <Link className="rw-earn-item" to="/readiness">
                <span className="rw-earn-icon">
                <ShieldCheck size={24} />
                </span>

                <span>
                <strong>Check your scam readiness</strong>
                <small>Find out what to practise next</small>
                </span>

                <span className="rw-earn-pill">+5 pts</span>
            </Link>

            </div>

        </section>
      </div>
      <section className="rw-section rw-redeem-preview">
        <SectionTitle path="/rewards/catalog">Redeem Rewards</SectionTitle>
        <div className="rw-catalog-grid">{rewardCatalog.slice(0, 3).map((reward) =>
          <CatalogTile key={reward.id} reward={reward} points={rewards.points}/>
        )}</div>
      </section>
      <p className="rw-demo-note">Prototype only: points, redemption and voucher codes are simulated in this browser.</p>
    </div></main>
  );
}


export default RewardsHome;
