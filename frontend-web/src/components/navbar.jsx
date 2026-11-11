import "../css/navbar.css";
import ReventLogo from "./ReventLogo.jsx";
import { NavLink } from 'react-router-dom';
import {Search,CircleHelp,Bell,ChevronDown,LogOut,Bot,} from "lucide-react";
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('reventDemoLogin');
    navigate('/login', { replace: true });
  };
  return (
    <header className="navbar">
      {/* TOP NAVIGATION */}
      <div className="navbar-top">
        {/* Branding */}
        <div className="navbar-brand">
          <ReventLogo />

          <span className="navbar-brand-divider"></span>

          <span className="navbar-brand-label">Online Banking</span>
        </div>

        {/* Right-side controls */}
        <div className="navbar-controls">
          <div className="navbar-search">
            <Search size={17} />
            <input
              type="search"
              placeholder="Search banking"
              aria-label="Search banking"
            />
          </div>

          <button
            className="navbar-icon-button"
            type="button"
            aria-label="Help"
          >
            <CircleHelp size={20} />
          </button>

          <button
            className="navbar-icon-button"
            type="button"
            aria-label="Notifications"
          >
            <Bell size={20} />
          </button>

          <button className="navbar-profile" type="button">
            <span className="navbar-avatar">K</span>
            <span>Kiki</span>
            <ChevronDown size={15} />
          </button>

          <button type="button" className="navbar-logout"onClick={handleLogout}>
            <LogOut size={17} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* BOTTOM NAVIGATION */}
      <nav className="navbar-bottom" aria-label="Main navigation">
      <div className="navbar-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/accounts">Accounts</NavLink>
        <NavLink to="/transfer">Transfer & Pay</NavLink>
        <NavLink to="/cards">Cards</NavLink>
        <NavLink to="/rewards">Rewards</NavLink>
        <NavLink to="/more">More</NavLink>
      </div>

        <a href="#" className="navbar-chatbot">
          <Bot size={19} />
          <span>AI Chatbot</span>
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
