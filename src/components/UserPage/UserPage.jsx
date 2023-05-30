import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import '../Styling/LoggedIn.css';

// Import Components:
import Nav from '../Nav/Nav';
import LunarClock from '../LunarPhase/LunarClock';
import LunarBtns from '../LunarPhase/LunarBtns';
import ChoreCategories from '../ChoreCategories/ChoreCategories';

function UserPage() {

  const dispatch = useDispatch();
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const moonPhase = useSelector((store) => store.moonPhases);
  const tasks = useSelector((store) => store.tasks);
  console.log('these are the tasks from DB:', tasks);

  // first check if there is already moonPhase object in the store.
  // If not, dispatch to make Astronomy API call for that data. 
  useEffect(() => {
    if (moonPhase.data) {
      return
    } else {
      dispatch({ type: 'FETCH_MOON_PHASES' });
    }
  }, [dispatch]);

  // Handling async call to API; in the ELSE will put a loading gif/icon 
  // while call is made 
  function MoonTable() {
    if (moonPhase.data) {
      return (
        <p>{JSON.stringify(moonPhase.data.data.table.rows[0].cells[0].extraInfo.phase.string)}</p>
      )
    } else {
      return (
        <p> there is no data yet </p>
      )
    }
  }

  return (
    <div className="page-layout">

      <div className="nav-options">
        <Nav />
      </div>

      <div className="lunar-clock">
        <LunarClock />
      </div>

      <div className="lunar-btns">
        <LunarBtns />
      </div>

      <div className="sidebar">
        <ChoreCategories />
      </div>

      <div className="page-content">
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
        <p>Here are the moon phases right now:</p>
        <MoonTable />
        <LogOutButton className="btn" />
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
