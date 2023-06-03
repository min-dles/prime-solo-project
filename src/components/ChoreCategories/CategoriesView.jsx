import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../Layouts/LoggedIn.css';

// STEPS: 
// 1. Need to access store for user's task list 
// 2. Need to identify chore categories (switch statement?)
// Use State to keep track of a toggled Category btn 
// 3. Run through tasks array and only pull the tasks matching a chosen category
// 4. Display the tasks for user 

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

	return (
		<>
			<h3>{selectedCategory} Category:</h3>

			{
				tasksByCategory.length ? tasksByCategory.map(task => {
					return (
						<ul key={task.task_id}>
							<li>Description: {task.task}
								<div className="chip">Phase: {task.phase}</div>
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