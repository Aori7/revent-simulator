import { formatDate } from '../../utils/rewardsHelpers';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Gift, Medal, Trophy } from 'lucide-react';
import useDemoRewards from '../../hooks/useDemoRewards';
import { RewardHeading, PointsStrip } from '../../components/rewardUI';

export default function MyPoints() {
  const { rewards } = useDemoRewards();
  const [tab, setTab] = useState('all');
  const activity = useMemo(() => rewards.activities
    .filter((item) => tab === 'all' || item.type === tab)
    .sort((a, b) => new Date(b.at) - new Date(a.at)), [rewards.activities, tab]);
  return <main className="rw-page"><div className="rw-container rw-narrow">
    <RewardHeading title="My Points" />
    <PointsStrip points={rewards.points} link={false}/>
    <h2 className="rw-activity-title">My Activity</h2>
    <div className="rw-segmented" role="tablist" aria-label="Point activity">
      {['all', 'earned', 'redeemed'].map((value) =>
        <button type="button" role="tab" aria-selected={tab === value} key={value}
          className={tab === value ? 'active' : ''} onClick={() => setTab(value)}>
          {value[0].toUpperCase() + value.slice(1)}</button>
      )}
    </div>
    <div className="rw-activity-list">
      {activity.length ? activity.map((item) =>
        <article className="rw-activity-row" key={item.id}>
          <span className="rw-activity-icon">{item.type === 'earned' ? <Trophy size={23}/> : <Gift size={23}/>}</span>
          <div className="rw-activity-copy"><span>{formatDate(item.at)}</span><strong>{item.title}</strong></div>
          <strong className={item.points > 0 ? 'rw-positive' : 'rw-negative'}>
            {item.points > 0 ? '+' : ''}{item.points} pts</strong>
        </article>) : <div className="rw-empty"><Medal size={36}/><h2>No activity yet</h2><p>Try another filter or earn points by learning.</p></div>}
    </div>
    <Link to="/rewards/earn" className="rw-inline-link">How to earn points <ArrowRight size={16}/></Link>
  </div></main>;
}

