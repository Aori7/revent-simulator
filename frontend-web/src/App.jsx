
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import SimulatorBubble from './components/simulator/SimulatorBubble';

import Login from './pages/Login';
import Navbar from './components/navbar';
import Dashboard from './components/dashboard';
import MobileNavbar from './components/MobileNavbar';

import Accounts from './pages/Accounts';
import Transfer from './pages/Transfer';
import Cards from './pages/Cards';
import Rewards from './pages/Rewards';
import Education from './pages/Education';
import LearningCardDetails from './pages/learningCardDetails';
import AwarenessLevel from './pages/awarenessLevel';
import ReadinessCheck from './pages/readinessCheck';
import More from './pages/More';

import TransactionDetails from './pages/TransactionDetails';
import PaymentReview from './pages/PaymentReview';

// Demo-only route protection
function DemoProtectedRoute() {
  const isLoggedIn =
    sessionStorage.getItem('reventDemoLogin') === 'true';

  return isLoggedIn
    ? <Outlet />
    : <Navigate to="/login" replace />;
}

// Layout shared by banking pages
function BankingLayout() {
  return (
    <>
      <Navbar />
      <MobileNavbar />

      <Outlet />

      <SimulatorBubble />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<DemoProtectedRoute />}>
          <Route element={<BankingLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/transfer" element={<Transfer />} />

            {/* Joelle's new routes */}
            <Route
              path="/transactions/:transactionId"
              element={<TransactionDetails />}
            />
            <Route
              path="/transfer/review"
              element={<PaymentReview />}
            />

            <Route path="/cards" element={<Cards />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/education" element={<Education />} />
            <Route path="/education/:topicId" element={<LearningCardDetails />} />
            <Route path="/awareness" element={<AwarenessLevel />} />
            <Route path="/readiness" element={<ReadinessCheck />} />
            <Route path="/more" element={<More />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
