import '../css/dashboard.css';

function Dashboard() {
  return (
    <main className="dashboard">

      {/* Welcome */}
      <section className="dashboard-welcome">
        <div>
          <h1>Welcome, Kiki</h1>
          <p>
            A clear view of your money.
            A little more peace of mind.
          </p>
        </div>

        <div className="dashboard-date">
          <p>Friday, 6 November 2026</p>
          <span>Balances updated just now</span>
        </div>
      </section>

      {/* Everyday Banking */}
      <section className="dashboard-panel">
        <h2 className="section-label">EVERYDAY BANKING</h2>

        <div className="banking-actions">
          <button>PayNow</button>
          <button>Scan & Pay</button>
          <button>Transfer</button>
          <button>Pay bills</button>
          <button>Manage payees</button>
          <button>More services</button>
        </div>
      </section>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid">

        <div className="dashboard-left">
          <section className="dashboard-panel">
            <h2>Your account</h2>
            <p>OCBC Frank Account</p>
            <h1>SGD 6,700.00</h1>
            <p>Available balance</p>
          </section>

          <section className="dashboard-panel">
            <h2>Recent Transactions</h2>
            <p>Your latest account activity</p>
          </section>
        </div>

        <div className="dashboard-right">
          <section className="dashboard-panel">
            <h2>Your cards</h2>
          </section>

          <section className="dashboard-panel">
            <h2>Safer Banking</h2>
            <p>A second look. A safer payment.</p>
          </section>

          <section className="dashboard-panel">
            <h2>Rewards</h2>
          </section>
        </div>

      </div>
    </main>
  );
}

export default Dashboard;