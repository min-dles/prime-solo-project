import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../Layouts/LoggedIn.css';
import { moonPhases } from '../../util/constants';

export default function LunarPhaseView() {
  const dispatch = useDispatch();
  const { selectedPhase } = useParams();
  const tasks = useSelector(store => store.tasks);

  // dispatch to store for the tasks list; make sure to call DB only if store is empty: 
  useEffect(() => {
    if (!tasks.length) {
      dispatch({
        type: 'FETCH_TASKS'
      });
    }
  }, [dispatch]);

  function listByMoonPhase(tasksArray) {
    let phaseArray = [];
    for (let obj of tasksArray) {
      if (Number(selectedPhase) === obj.phase) {
        phaseArray.push(obj);
      }
    }
    console.log('selected phase:', selectedPhase);
    console.log('task and phase arrays:', tasksArray, phaseArray);
    return phaseArray;
  }

  const tasksByPhase = listByMoonPhase(tasks);

  // Need to convert useParams moon phase IDs to get the moon phase names:
  const currentMoonPhase = moonPhases.find(phase => phase.id === Number(selectedPhase));
  console.log('current moon phase:', currentMoonPhase);


  return (
    <>
      <h3>{currentMoonPhase.phase}</h3>

      {tasksByPhase.length ? tasksByPhase.map(task => {
        return (
          <ul key={task.task_id}>
            <li>Description: {task.task}
              <div className="chip">{task.category}</div>
            </li>
          </ul>
        )
      }) : (
        <p>
          There is nothing scheduled during this moon phase.
        </p>
      )}
    </>
  )
}