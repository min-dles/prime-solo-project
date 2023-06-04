import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Layouts/LoggedIn.css';
import { choreCategories, moonPhases } from '../../util/constants';
import { Moon } from 'lunarphase-js';

function EditOrDelete() {

  const dispatch = useDispatch();
  const tasks = useSelector((store) => store.tasks);
  const [categoryChosen, setCategoryChosen] = useState(0);
  const [taskDescription, setTaskDescription] = useState('');
  const [moonPhase, setMoonPhase] = useState(0);
  const [idCurrentlyEditing, setIdCurrentlyEditing] = useState(0);

  // Need separate function to call Moon Phase emojis based on id: 
  function getEmojiFromMoonId(phaseID) {
    for (let phase of moonPhases) {
      if (phase.id === phaseID) {
        return Moon.emojiForLunarPhase(phase.phase);
      }
    }
  }

  // dispatch to store for the tasks list; make sure to call DB only if store is empty:
  useEffect(() => {
    if (!tasks.length) {
      dispatch({
        type: 'FETCH_TASKS'
      });
    }
  }, [dispatch]);

  // When user clicks Delete for a task, it will be removed from DB
  const deleteTask = id => {
    console.log('Delete this task:', id);
    dispatch({
      type: 'DELETE_TASK',
      payload: id
    });
  }; // end deleteTask, STRETCH GOAL: want to add confirmation pop-up! 

  // handle submit to Update tasks:
  const handleSubmit = (event) => {
    console.log('Update task ID is:', idCurrentlyEditing);
    event.preventDefault();
    // Need to find current task ID in the array of tasks (from store) 
    const currentTask = tasks.find(task => task.task_id === idCurrentlyEditing);

    dispatch({
      type: 'UPDATE_TASK',
      payload: {
        task_id: idCurrentlyEditing,
        todo_description: taskDescription.length ? taskDescription : currentTask.task,
        category_id: Number(categoryChosen ? categoryChosen : currentTask.category_id),
        moon_id: Number(moonPhase ? moonPhase : currentTask.phase)
      }
    })

    setIdCurrentlyEditing(0);
    setMoonPhase(0);
    setCategoryChosen(0);
    setTaskDescription('');
  }

  return (
    <>
      <h3>Your Tasks:</h3>
      {tasks.map(task => {
        return (
          <ul key={task.task_id}>
            <li>
              {idCurrentlyEditing != task.task_id ?
                <>
                  <button onClick={() => { setIdCurrentlyEditing(task.task_id) }}>EDIT</button>

                  {task.task}
                  <div className="chip">{task.category}</div>
                  <div className="chip">Phase: {getEmojiFromMoonId(task.phase)}</div>
                  <button
                    onClick={() => deleteTask(task.task_id)}
                  >
                    DELETE
                  </button>
                </>
                :

                <form onSubmit={handleSubmit}>
                  <input
                    name="description"
                    value={taskDescription === '' ? task.task : taskDescription}
                    onChange={(event) => { setTaskDescription(event.target.value) }}
                  />
                  <select
                    value={categoryChosen ? categoryChosen : task.category_id}
                    onChange={(event) => { setCategoryChosen(event.target.value) }}
                  >
                    {choreCategories.map(category => {
                      return (
                        <option
                          key={category.id}
                          value={category.id}>
                          {category.name}
                        </option>
                      )
                    })}
                  </select>
                  <select
                    value={moonPhase ? moonPhase : task.phase}
                    onChange={(event) => { setMoonPhase(event.target.value) }}
                  >
                    {moonPhases.map(moon => {
                      return (
                        <option
                          key={moon.id}
                          value={moon.id}>
                          {moon.phase}
                        </option>
                      )
                    })}
                  </select>
                  <input
                    type="submit"
                  />
                </form>
              }

            </li>
          </ul>
        )
      })}
    </>
  )
}

export default EditOrDelete;