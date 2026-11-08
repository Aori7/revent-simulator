import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SimulatorBubble from './components/simulator/SimulatorBubble';

import Navbar from './components/navbar';
import Dashboard from './components/dashboard';
import MobileNavbar from './components/MobileNavbar';

import Accounts from './pages/Accounts';
import Transfer from './pages/Transfer';
import Cards from './pages/Cards';
import Rewards from './pages/Rewards';
import More from './pages/More';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <MobileNavbar /> 
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/more" element={<More />} />
      </Routes>
    <SimulatorBubble />
    </BrowserRouter>
  );
}

export default App;