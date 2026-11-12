import { useState } from 'react';
import useDemoRewards from '../../hooks/useDemoRewards';
import { rewardCatalog } from '../../data/rewardsData';
import { RewardHeading, PointsStrip, CatalogTile } from '../../components/rewardUI';

export default function RewardCatalog() {
  const { rewards } = useDemoRewards();
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...new Set(rewardCatalog.map((item) => item.category))];
  return <main className="rw-page"><div className="rw-container">
    <RewardHeading title="Redeem Rewards" subtitle="Choose a reward to see its details"/>
    <PointsStrip points={rewards.points}/>
    <div className="rw-filter-pills" aria-label="Reward categories">{categories.map((category) =>
      <button key={category} type="button" className={filter === category ? 'active' : ''} onClick={() => setFilter(category)}>{category}</button>
    )}</div>
    <div className="rw-catalog-grid rw-catalog-full">
      {rewardCatalog.filter((reward) => filter === 'All' || reward.category === filter).map((reward) =>
        <CatalogTile key={reward.id} reward={reward} points={rewards.points}/>) }
    </div>
  </div></main>;
}

