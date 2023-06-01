import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

// NavBar is going to be transformed to all-black with "clock" 
// on left side. CONDITIONAL RENDERING - nav bar will NOT appear
// UNTIL user is logged in 
function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div>
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

            <Link className="navLink" to="/user/add-task">
              Add Task
            </Link>

            <Link className="navLink" to="/user/edit-delete">
              Edit / Delete Task
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <LogOutButton className="navLink" />
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
