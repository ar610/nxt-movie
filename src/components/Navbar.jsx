import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import './Navbar.css';
import { useState } from 'react';

function Navbar() {
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/home">NXT MOVIE</Link>
        </div>

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(prev => !prev)}
        >
          ☰
        </button>

        <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <Link to="/home" className="navbar-link" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/movies" className="navbar-link" onClick={() => setMenuOpen(false)}>
            My Movies
          </Link>

          <div className="navbar-user">
            <span className="user-email">{user.displayName}</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
