import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import SimulatorBubble from "./components/simulator/SimulatorBubble";
import Navbar from "./components/navbar";
import Dashboard from "./components/dashboard";
import MobileNavbar from "./components/MobileNavbar";

import Login from "./pages/Login";
import Accounts from "./pages/Accounts";
import Transfer from "./pages/Transfer";
import Cards from "./pages/Cards";
import Rewards from "./pages/Rewards";
import More from "./pages/More";
import TransactionDetails from "./pages/TransactionDetails";
import PaymentReview from "./pages/PaymentReview";
import PaymentConfirmation from "./pages/PaymentConfirmation";

function DemoProtectedRoute() {
  const isLoggedIn = sessionStorage.getItem("reventDemoLogin") === "true";

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<DemoProtectedRoute />}>
          <Route element={<BankingLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/transfer/review" element={<PaymentReview />} />
            <Route
              path="/transfer/confirmation"
              element={<PaymentConfirmation />}
            />
            <Route
              path="/transactions/:transactionId"
              element={<TransactionDetails />}
            />
            <Route path="/cards" element={<Cards />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/more" element={<More />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}