import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Styling/LoggedIn.css';

// Import Components:
import Nav from '../Nav/Nav';
import LunarClock from '../LunarPhase/LunarClock';
import LunarBtns from '../LunarPhase/LunarBtns';
import ChoreCategories from '../ChoreCategories/ChoreCategories';

function EditOrDelete() {

  const dispatch = useDispatch();
  const tasks = useSelector((store) => store.tasks);

  // dispatch to store for the tasks list; make sure to call DB only if store is empty:
  useEffect(() => {
    if (!tasks.length) {
      dispatch({
        type: 'FETCH_TASKS'
      });
    }
  }, [dispatch]);

  const deleteTask = id => {
    console.log('Delete this task:', id);
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
        <h3>Your Tasks:</h3>
        {tasks.map(task => {
          return (
            <ul key={task.task_id}>
              <li>
                <button>EDIT</button>
                {task.task}
                <div className="chip">{task.category}</div>
                <div className="chip">Phase: {task.phase}</div>
                <button
                  onClick={() => deleteTask(task.task_id)}
                >
                  DELETE
                </button>
              </li>
            </ul>
          )
        })}
      </div></div>
  )
}

export default EditOrDelete;