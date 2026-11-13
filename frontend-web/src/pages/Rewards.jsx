import { Route, Routes } from 'react-router-dom';
import RewardsHome from './rewards/rewardsHome';
import MyRewards from './rewards/myRewards';
import MyPoints from './rewards/myPoints';
import RewardCatalog from './rewards/rewardCatalog';
import RewardDetails from './rewards/rewardDetails';
import RedemptionSuccess from './rewards/redemptionSuccess';
import EarnPoints from './rewards/earnPoints';
import '../css/rewards.css';

export default function Rewards() {
  return (
    <Routes>
      <Route index element={<RewardsHome />} />
      <Route path="mine" element={<MyRewards />} />
      <Route path="points" element={<MyPoints />} />
      <Route path="catalog" element={<RewardCatalog />} />
      <Route path="voucher/:voucherId" element={<RewardDetails />} />
      <Route path="success" element={<RedemptionSuccess />} />
      <Route path="earn" element={<EarnPoints />} />
      <Route path="*" element={<RewardsHome />} />
    </Routes>
  );
}
