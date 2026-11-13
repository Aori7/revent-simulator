import { NavLink } from 'react-router-dom';

import {House,Bot,ArrowLeftRight,Gift,Menu} from 'lucide-react';

import '../css/mobile-navbar.css';

function MobileNavbar() {
  return (
    <nav className="mobile-bottom-nav">

      <NavLink to="/" end>
        <House size={26} />
        <span>Home</span>
      </NavLink>

      <NavLink to="/scam-chatbot">
        <Bot size={26} />
        <span>AI Chatbot</span>
      </NavLink>

      <NavLink to="/transfer">
        <ArrowLeftRight size={26} />
        <span>Transfer</span>
      </NavLink>

      <NavLink to="/rewards">
        <Gift size={26} />
        <span>Rewards</span>
      </NavLink>

      <NavLink to="/more">
        <Menu size={26} />
        <span>More</span>
      </NavLink>

    </nav>
  );
}

export default MobileNavbar;
