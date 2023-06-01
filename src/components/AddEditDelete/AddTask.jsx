function AddTask() {

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
    'Household',
    'Cleaning',
    'Social',
    'Documents',
    'Health',
    'Shopping'
  ];

  return (
    <form>
      <label for="description">Task Description:</label>
      <input type="text" id="description" name="description" placeholder="e.g. sweep the garage" />

      <label for="phase">Choose A Moon Phase:</label>
      {moonPhases.map(phase => {
        return (
          <label>
            <input
              type="radio"
              id={phase.id}
              name="moon_phase"
              value={phase.phase}
            />
            {phase.phase}
          </label>
        )
      })}

      <label for="category">Choose A Category:</label>
      <select>
        {choreCategories.map(category => {
          return (
            <option value={category}>{category}</option>
          )
        })}
      </select>
      <button>ADD TASK</button>
    </form>
  )
}

export default AddTask;