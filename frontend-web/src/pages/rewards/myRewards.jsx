import { formatDate, getStatus } from '../../utils/rewardsHelpers';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Ticket } from 'lucide-react';
import useDemoRewards from '../../hooks/useDemoRewards';
import { getRewardById } from '../../data/rewardsData';
import { RewardHeading, RewardVisual } from '../../components/rewardUI';

export default function MyRewards() {
  const { rewards, markUsed } = useDemoRewards();
  const [tab, setTab] = useState('available');
  const [sort, setSort] = useState('newest');
  const [expandedId, setExpandedId] = useState(() => new URLSearchParams(window.location.search).get('voucher'));
  const [revealedId, setRevealedId] = useState(null);
  const vouchers = useMemo(() => rewards.vouchers
    .filter((item) => getStatus(item) === tab)
    .sort((a, b) => sort === 'expiry'
      ? new Date(a.expiresAt) - new Date(b.expiresAt)
      : sort === 'oldest'
        ? new Date(a.redeemedAt) - new Date(b.redeemedAt)
        : new Date(b.redeemedAt) - new Date(a.redeemedAt)), [rewards.vouchers, tab, sort]);

  return <main className="rw-page"><div className="rw-container rw-narrow">
    <RewardHeading title="My Rewards" subtitle="Your available, used and expired vouchers"/>
    <div className="rw-segmented" role="tablist" aria-label="Voucher status">
      {['available', 'used', 'expired'].map((status) =>
        <button key={status} role="tab" aria-selected={tab === status}
          className={tab === status ? 'active' : ''}
          onClick={() => { setTab(status); setExpandedId(null); setRevealedId(null); }}>
          {status[0].toUpperCase() + status.slice(1)}</button>
      )}
    </div>
    <div className="rw-list-tools">
      <span>{vouchers.length} {vouchers.length === 1 ? 'reward' : 'rewards'}</span>
      <label className="rw-sort-label">Sort by <select value={sort} onChange={(event) => setSort(event.target.value)}>
        <option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="expiry">Expiry date</option>
      </select></label>
    </div>
    <div className="rw-my-voucher-list">
      {vouchers.length ? vouchers.map((voucher) => {
        const reward = getRewardById(voucher.catalogId);
        if (!reward) return null;
        const open = expandedId === voucher.id;
        return <article className="rw-my-voucher" key={voucher.id}>
          <button type="button" className="rw-my-voucher-head" aria-expanded={open}
            onClick={() => setExpandedId(open ? null : voucher.id)}>
            <RewardVisual reward={reward}/>
            <span className="rw-my-voucher-name"><strong>{reward.title}</strong>
              <small className={`rw-status rw-status-${tab}`}>{tab}</small></span>
            <ChevronDown className={open ? 'rw-rotate' : ''} size={19}/>
          </button>
          {open && <div className="rw-voucher-expanded">
            <dl><div><dt>Voucher code</dt><dd>{revealedId === voucher.id ? voucher.code : 'DEMO-••••••'} </dd></div>
              <div><dt>Redemption date</dt><dd>{formatDate(voucher.redeemedAt)}</dd></div>
              <div><dt>Expiry date</dt><dd>{formatDate(voucher.expiresAt)}</dd></div></dl>
            {tab === 'available' && <div className="rw-voucher-actions">
              <button type="button" className="rw-primary" onClick={() => revealedId === voucher.id ? markUsed(voucher.id) : setRevealedId(voucher.id)}>
                {revealedId === voucher.id ? 'Mark as Used (Demo)' : 'Use Now'}</button>
              {revealedId === voucher.id && <p>This is a demo code, not a real voucher. Select “Mark as Used” to simulate usage.</p>}
            </div>}
            <details className="rw-terms"><summary>T&amp;Cs apply</summary><p>{reward.terms}</p></details>
          </div>}
        </article>;
      }) : <div className="rw-empty"><Ticket size={38}/><h2>No {tab} vouchers</h2><p>Rewards in this category will appear here.</p>
        <Link to="/rewards/catalog">Explore rewards</Link></div>}
    </div>
    <Link to="/rewards/catalog" className="rw-inline-link">Browse more rewards <ArrowRight size={16}/></Link>
  </div></main>;
}

