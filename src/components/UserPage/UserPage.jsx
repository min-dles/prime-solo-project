import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Moon } from 'lunarphase-js';
import { moonPhases } from '../../util/constants';

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

  // Need separate function to call Moon Phase emojis based on id: 
  function getEmojiFromMoonId(phaseID) {
    for (let phase of moonPhases) {
      if (phase.id === phaseID) {
        return Moon.emojiForLunarPhase(phase.phase);
      }
    }
  }

  // Need to update DB when status is marked as completed: 
  const handleChange = (taskId) => {
    // can't use Index; need to sort by TaskID so DB and client-side are synced correctly 
    const taskToUpdate = tasks.find((task) => task.task_id === taskId);
    console.log('taskToUpdate:', taskToUpdate);
    const payload = {
      task_id: taskToUpdate.task_id,
      completion_status: !taskToUpdate.completion_status
    }
    console.log('payload:', payload);
    dispatch({
      type: 'COMPLETE_TASK',
      payload
    })
  }

  return (
    <>
      <h2>Welcome, {user.username}!</h2>
      <h3>Here are your Tasks:</h3>
      <ul>
        {tasks.map(({ task, task_id, phase, category, completion_status
        }) => {
          return (
            <li key={task_id}>
              <label>
                <div className={completion_status ? "completed-task" : "uncompleted-task"}>
                  <input
                    type="checkbox"
                    id={`custom-checkbox=${task_id}`}
                    checked={completion_status}
                    onChange={() => handleChange(task_id)}
                  />
                  {task}
                  <div className="category chip">{category}</div>
                  <div className="moon-phase chip">Phase: {getEmojiFromMoonId(phase)}</div>
                </div>
              </label>
            </li>
          )
        })}
      </ul>
    </>
  );
}

export default UserPage;
