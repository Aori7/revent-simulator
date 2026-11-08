import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar';
import Dashboard from './components/dashboard';

import Accounts from './pages/Accounts';
import Transfer from './pages/Transfer';
import Cards from './pages/Cards';
import Rewards from './pages/Rewards';
import More from './pages/More';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/more" element={<More />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;