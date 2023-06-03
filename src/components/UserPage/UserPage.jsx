import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';

function UserPage() {

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const moonPhase = useSelector((store) => store.moonPhases);
  const tasks = useSelector((store) => store.tasks);

  // dispatch to store for the tasks list; make sure to call DB only if store is empty:
  useEffect(() => {
    if (!tasks.length) {
      dispatch({
        type: 'FETCH_TASKS'
      });
    }
  }, [dispatch]);

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
    <>
      <h2>Welcome, {user.username}!</h2>
      <h3>Here are your Tasks:</h3>
      {tasks.map(task => {
        return (
          <ul key={task.task_id}>
            <li> Description: {task.task}
              <div className="chip">{task.category}</div>
              <div className="chip">Phase: {task.phase}</div>
            </li>
          </ul>
        )
      })}
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
