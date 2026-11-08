
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

import ReventLogo from '../components/ReventLogo';
import '../css/login.css';

function Login() {
  const navigate = useNavigate();

  const [accessCode, setAccessCode] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');

  // fictional credentials for frontend testing only
  const demoAccessCode = 'revent123';
  const demoPin = '123456';

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!accessCode.trim() || !pin) {
      setError('Please enter your Access Code and PIN.');
      return;
    }

    if (
      accessCode === demoAccessCode &&
      pin === demoPin
    ) {
      sessionStorage.setItem('reventDemoLogin', 'true');
      navigate('/', { replace: true });
    } else {
      setError('Invalid Access Code or PIN.');
    }
  };

  return (
    <main className="login-page">
      <div className="login-content">

        <div className="login-card">
          <ReventLogo />

          <h1>Online Banking</h1>

          <form onSubmit={handleLogin}>
            <label htmlFor="accessCode">Access Code</label>
            <input
              id="accessCode"
              type="text"
              placeholder="Enter Access Code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              autoComplete="username"
            />

            <label htmlFor="pin">PIN</label>

            <div className="login-pin-wrapper">
              <input
                id="pin"
                type={showPin ? 'text' : 'password'}
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                autoComplete="current-password"
              />

              <button
                type="button"
                className="login-show-pin"
                onClick={() => setShowPin(!showPin)}
                aria-label={showPin ? 'Hide PIN' : 'Show PIN'}
              >
                {showPin ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>

            {error && (
              <p className="login-error" role="alert">
                {error}
              </p>
            )}

            <button type="submit" className="login-submit">
              Login
            </button>
          </form>

          <button
            type="button"
            className="login-help"
            onClick={() => setError('Demo account: revent123 / 123456')}
          >
            Trouble logging in?
          </button>
        </div>

        <p className="login-register">
          Don't have Online Banking? Sign up now.
        </p>

      </div>

      <footer className="login-footer">
         @Revent. All Rights Reserved. Conditions of Access | Policies | Security | Need Help?
      </footer>
    </main>
  );
}

export default Login;
