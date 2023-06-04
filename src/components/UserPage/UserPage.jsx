import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Moon } from 'lunarphase-js';
import { moonPhases } from '../../util/constants';

function UserPage() {

  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const moonPhase = useSelector((store) => store.moonPhases);
  const tasks = useSelector((store) => store.tasks);
  const [checked, setChecked] = useState(
    new Array(tasks.length).fill(false)
  );
  // const [statusClass, setStatusClass] = useState("uncompleted-task");
  // const [idCurrentlyCompleting, setIdCurrentlyCompleting] = useState(0);

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
  const handleChange = (position) => {
    const updatedTaskStatus = checked.map((task, index) =>
      index === position ? !task : task);

    setChecked(updatedTaskStatus);
    let taskCompletionID = tasks[position].task_id;
    let a = updatedTaskStatus[position];
    // let completionStatusChange = tasks[position].completion_status;
    // completionStatusChange = updatedTaskStatus[position];
    // console.log('need to see what is happening here:', taskCompletionID, completionStatusChange)

    dispatch({
      type: 'COMPLETE_TASK',
      payload: {
        task_id: taskCompletionID,
        completion_status: a
      }
    })
    // console.log('checking status here!', tasks[position].completion_status, updatedTaskStatus[position]);


    // console.log('currently checked?', updatedTaskStatus);
    // const taskCompletionStatus = updatedTaskStatus.reduce(
    //   (currentState, index) => {
    //     if (currentState === true) {
    //       return true;
    //     }
    //     return false;
    //   }
    // );
    // console.log('another check, okay?', taskCompletionStatus);
    // event.preventDefault();
    // setChecked(!checked);
    // console.log('status of checked:', checked);
    // const currentTask = tasks.find(task => task.task_id === idCurrentlyCompleting);
    // console.log('The task to be marked as completed:', currentTask.task, currentTask.completion_status);
  }

  // {checked ? className="completed-task" : className="uncompleted-task"}

  return (
    <>
      <h2>Welcome, {user.username}!</h2>
      <h3>Here are your Tasks:</h3>
      {tasks.map(({ task, task_id, phase, category, completion_status }, index) => {
        return (
          <ul key={index}>
            <label>
              {!checked[index] ?
                <div className="uncompleted-task">
                  <input
                    type="checkbox"
                    id={`custom-checkbox=${index}`}
                    checked={checked[index]}
                    onChange={() => handleChange(index)}
                  />
                  {task}
                  <div className="category chip">{category}</div>
                  <div className="moon-phase chip">Phase: {getEmojiFromMoonId(phase)}</div>
                </div>
                :

                <div className="completed-task">
                  <input
                    type="checkbox"
                    id={`custom-checkbox=${index}`}
                    checked={checked[index]}
                    onChange={() => handleChange(index)}
                  />
                  {task}
                </div>
              }
            </label>
          </ul>
        )
      })}
    </>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
