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

import Education from "./pages/Education";
import LearningCardDetails from "./pages/learningCardDetails";
import AwarenessLevel from "./pages/awarenessLevel";
import ReadinessCheck from "./pages/readinessCheck";
import More from "./pages/More";

import TransactionDetails from "./pages/TransactionDetails";
import PaymentReview from "./pages/PaymentReview";
import PaymentConfirmation from "./pages/PaymentConfirmation";

import ScamChatbot from "./pages/ScamChatbot";

import RiskTest from "./components/simulator/RiskTest";
import TransferHub from "./pages/TransferHub";
// Demo-only route protection
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
        
        {/* Temporary chatbot preview with existing navbar */}
        <Route element={<BankingLayout />}>
          <Route path="/scam-chatbot-preview" element={<ScamChatbot />} />
        </Route>

        <Route element={<DemoProtectedRoute />}>
          <Route element={<BankingLayout />}>
            <Route path="/" element={<Dashboard />} />
          <Route path="/risk-test" element={<RiskTest />} />

            <Route path="/accounts" element={<Accounts />} />
            <Route path="/transfer" element={<TransferHub />} />
            <Route path="/transfer/ecommerce" element={<Transfer />} /> 
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
            <Route path="/education" element={<Education />} />
            <Route
              path="/education/:topicId"
              element={<LearningCardDetails />}
            />
            <Route path="/awareness" element={<AwarenessLevel />} />
            <Route path="/readiness" element={<ReadinessCheck />} />
            <Route path="/more" element={<More />} />
            <Route path="/scam-chatbot" element={<ScamChatbot />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
