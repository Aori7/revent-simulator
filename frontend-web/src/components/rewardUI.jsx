import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Bus, ChevronRight, Coffee, ShoppingBasket, Star } from 'lucide-react';
import { getRewardById } from '../data/rewardsData';
import { getStatus } from '../utils/rewardsHelpers';

export function RewardVisual({ reward, large = false }) {
  const icon = reward?.icon === 'bus' ? <Bus /> : reward?.icon === 'coffee'
    ? <Coffee /> : <ShoppingBasket />;
  return (
    <div className={`rw-visual ${large ? 'rw-visual-large' : ''}`} aria-hidden="true">
      {icon}
    </div>
  );
}

export function RewardHeading({ title, back = '/rewards', subtitle, action }) {
  return (
    <header className="rw-topbar">
      <div className="rw-topbar-title">
        {back && <Link to={back} className="rw-back" aria-label="Back"><ArrowLeft size={21} /></Link>}
        <div>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
      {action}
    </header>
  );
}

export function PointsStrip({ points, link = true }) {
  const contents = (
    <>
      <span className="rw-points-seal"><Star size={27}/></span>
      <span className="rw-points-copy"><span>My Points</span><strong>{points.toLocaleString()} <small>pts</small></strong><small>Demo balance · expires Nov 2026</small></span>
      {link && <ChevronRight size={21} className="rw-points-arrow" />}
    </>
  );
  return link ? <Link to="/rewards/points" className="rw-points-strip">{contents}</Link>
    : <div className="rw-points-strip">{contents}</div>;
}

export function MiniVoucher({ voucher, to }) {
  const reward = getRewardById(voucher.catalogId);
  if (!reward) return null;
  return (
    <Link to={to} className="rw-mini-voucher">
      <RewardVisual reward={reward}/>
      <span className="rw-mini-voucher-copy"><strong>{reward.title}</strong><small className={`rw-status rw-status-${getStatus(voucher)}`}>{getStatus(voucher)}</small></span>
      <ChevronRight size={19}/>
    </Link>
  );
}

export function CatalogTile({ reward, points }) {
  return (
    <Link className="rw-catalog-tile" to={`/rewards/voucher/${reward.id}`}>
      <RewardVisual reward={reward} large/>
      <span className="rw-catalog-info">
        <strong>{reward.title}</strong>
        <span><Star size={13}/> {reward.cost} pts</span>
      </span>
      <ChevronRight size={18} className="rw-catalog-chevron"/>
      {points < reward.cost && <span className="rw-catalog-small-note">Earn more points</span>}
    </Link>
  );
}

export function SectionTitle({ children, path }) {
  return (
    <div className="rw-section-title"><h2>{children}</h2><Link to={path}>View All <ArrowRight size={14}/></Link></div>
  );
}

