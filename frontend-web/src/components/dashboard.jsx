import "../css/dashboard.css";
import "../css/everyday-banking.css";
import EverydayBanking from "./dashboard/EverydayBanking";
import AccountCard from "./dashboard/AccountCard";
import YourCards from './dashboard/YourCards';
import RecentTransactions from './dashboard/RecentTransactions';
import SecurityCard from './dashboard/SecurityCard';
import RewardsCard from './dashboard/RewardsCard';

function Dashboard() {
  // temporary data until we connect our database
  const account = {
    type: "REVENT Savings Account",
    accountNumber: "987-545678-876",
    balance: 6700,
    lockedAmount: 10000,
  };

  return (
    <main className="dashboard">
      {/* Welcome */}
      <section className="dashboard-welcome">
        <div>
          <h1>Welcome, Kiki</h1>
          <p>A clear view of your money. A little more peace of mind.</p>
        </div>
        <EverydayBanking />

        <div className="dashboard-date">
          <p>Friday, 6 November 2026</p>
          <span>Balances updated just now</span>
        </div>
      </section>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">
        <div className="dashboard-left">
          <AccountCard account={account} />
          <RecentTransactions />
        </div>

        <div className="dashboard-right">
          <YourCards />
          <SecurityCard />
          <RewardsCard />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
