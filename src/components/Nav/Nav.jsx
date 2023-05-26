import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { Moon } from 'lunarphase-js';

// NavBar is going to be transformed to all-black with "clock" 
// on left side. CONDITIONAL RENDERING - nav bar will NOT appear
// UNTIL user is logged in 
function Nav() {
  const user = useSelector((store) => store.user);
  const phase = Moon.lunarPhase();

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">{phase}</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {/* adding buttons to jump to moon phase options */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <LogOutButton className="navLink" />

            <button>New Moon</button>
            <button>Waxing Crescent</button>
            <button>First Quarter</button>
            <button>Waxing Gibbous</button>
            <button>Full Moon</button>
            <button>Waning Gibbous</button>
            <button>Third Quarter</button>
            <button>Waning Crescent</button>

          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
