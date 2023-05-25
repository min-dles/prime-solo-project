import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';

function UserPage() {

  const dispatch = useDispatch();
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const moonPhase = useSelector((store) => store.moonPhases);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOON_PHASES' });
  }, [dispatch]);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <p>Here are the moon phases right now:</p>
      <p>{JSON.stringify(moonPhase.data.data.table.rows[0].cells[0].extraInfo.phase.string)}</p>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
