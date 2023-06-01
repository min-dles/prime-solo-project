import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Styling/LoggedIn.css';

// Import Components:
import Nav from '../Nav/Nav';
import LunarClock from '../LunarPhase/LunarClock';
import LunarBtns from '../LunarPhase/LunarBtns';
import ChoreCategories from '../ChoreCategories/ChoreCategories';

function AddTask() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [taskDescription, setTaskDescription] = useState('');
  const [moonPhase, setMoonPhase] = useState(0);
  const [categoryChosen, setCategoryChosen] = useState(0);

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

  const submitAddTask = (event) => {
    event.preventDefault();
    const data = {
      user_id: user.id,
      todo_description: taskDescription,
      category_id: categoryChosen,
      moon_id: moonPhase
    }

    console.log('New task being sent to DB:', data);

    if (taskDescription !== '' && categoryChosen > 0) {
      dispatch({
        type: 'ADD_TASK',
        payload: data
      })
      clearFields();
    } else {
      alert('Please fill out all fields before submitting a new task entry!');
    }
  }

  // need to clear fields after user sends a new task to DB:
  const clearFields = () => {
    setTaskDescription('');
    setMoonPhase(0);
    setCategoryChosen(0);
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

      <form className="page-content" onSubmit={submitAddTask}>
        <label htmlFor="description">Task Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="e.g. sweep the garage"
          value={taskDescription}
          onChange={(event) => { setTaskDescription(event.target.value) }}
        />

        <label htmlFor="phase">Choose A Moon Phase:</label>
        {moonPhases.map(phase => {
          return (
            <label key={phase.id}>
              <input
                type="radio"
                id={phase.id}
                name="moon_phase"
                value={phase.phase}
                onChange={(event) => { setMoonPhase(event.target.id) }}
              />
              {phase.phase}
            </label>
          )
        })}

        <label htmlFor="category">Choose A Category:</label>
        <select
          value={categoryChosen}
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
        <button>ADD TASK</button>
      </form>
    </div>
  )
}

export default AddTask;