import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { moonPhases } from '../../util/constants';
import { Moon } from 'lunarphase-js';
import '../Layouts/LoggedIn.css';

function CategoriesView() {

	const dispatch = useDispatch();
	const { selectedCategory } = useParams();
	const tasks = useSelector(store => store.tasks);

	// dispatch to store for the tasks list; make sure to call DB only if store is empty: 
	useEffect(() => {
		if (!tasks.length) {
			dispatch({
				type: 'FETCH_TASKS'
			});
		}
	}, [dispatch]);

	function listByCategory(tasksArray) {
		let categoryArray = [];
		for (let obj of tasksArray) {
			if (selectedCategory === obj.category) {
				categoryArray.push(obj);
			}
		}
		return categoryArray;
	}

	const tasksByCategory = listByCategory(tasks);

  // Need separate function to call Moon Phase emojis based on id: 
  function getEmojiFromMoonId(phaseID) {
    for (let phase of moonPhases) {
      if (phase.id === phaseID) {
        return Moon.emojiForLunarPhase(phase.phase);
      }
    }
  }

	return (
		<>
			<h3>{selectedCategory} Category:</h3>

			{
				tasksByCategory.length ? tasksByCategory.map(task => {
					return (
						<ul key={task.task_id}>
							<li>{task.task}
								<div className="moon-phase chip">Phase: {getEmojiFromMoonId(task.phase)}</div>
							</li>
						</ul>
					)
				}) : (
					<p>
						There is nothing here.
					</p>
				)
			}
		</>
	)
}

export default CategoriesView;