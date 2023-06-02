import React, { useEffect, useState } from 'react';
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
  const [categoryChosen, setCategoryChosen] = useState(0);
  const [editMode, setEditMode] = useState(0);

  // make variables for moon phases and chore category arrays:
  const moonPhases = [
    {
      phase: 'New Moon',
      id: 1
    },
    {
      phase: 'Waxing Crescent',
      id: 2
    },
    {
      phase: 'First Quarter',
      id: 3
    },
    {
      phase: 'Waxing Gibbous',
      id: 4
    },
    {
      phase: 'Full Moon',
      id: 5
    },
    {
      phase: 'Waning Gibbous',
      id: 6
    },
    {
      phase: 'Last Quarter',
      id: 7
    },
    {
      phase: 'Waning Crescent',
      id: 8
    }
  ];

  const choreCategories = [
    {
      name: 'Choose Category',
      id: 0
    },
    {
      name: 'Household',
      id: 1
    },
    {
      name: 'Cleaning',
      id: 2
    },
    {
      name: 'Social',
      id: 3
    },
    {
      name: 'Documents',
      id: 4
    },
    {
      name: 'Health',
      id: 5
    },
    {
      name: 'Shopping',
      id: 6
    }
  ];

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

  // handle Update tasks:
  const updateTask = (event) => {
    console.log('Update task ID is:', editMode);
    event.preventDefault();
    setEditMode(0);
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
                {editMode != task.task_id ?
                  <>
                    <button onClick={() => { setEditMode(task.task_id) }}>EDIT</button>


                    {task.task}
                    <div className="chip">{task.category}</div>
                    <div className="chip">Phase: {task.phase}</div>
                    <button
                      onClick={() => deleteTask(task.task_id)}
                    >
                      DELETE
                    </button>
                  </>
                  :

                  <form onSubmit={updateTask}>
                    <input
                      name="description"
                      value={task.task}
                      onChange={(event) => { setTaskDescription(event.target.value) }}
                    />
                    <select
                      value={task.category_id}
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
                    <input
                      type="submit" 
                    />
                  </form>
                }

              </li>
            </ul>
          )
        })}
      </div></div>
  )
}

export default EditOrDelete;