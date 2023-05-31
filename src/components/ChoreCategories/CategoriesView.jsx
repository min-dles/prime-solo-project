import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Styling/LoggedIn.css';

// Import Components:
import Nav from '../Nav/Nav';
import LunarClock from '../LunarPhase/LunarClock';
import LunarBtns from '../LunarPhase/LunarBtns';
import ChoreCategories from '../ChoreCategories/ChoreCategories';

// STEPS: 
// 1. Need to access store for user's task list 
// 2. Need to identify chore categories (switch statement?)
// Use State to keep track of a toggled Category btn 
// 3. Run through tasks array and only pull the tasks matching a chosen category
// 4. Display the tasks for user 

function CategoriesView() {
    const dispatch = useDispatch();
    const [category, setCategory] = useState('Cleaning');
    const tasks = useSelector(store => store.tasks);

    // dispatch to store for the tasks list; make sure to call DB only if store is empty: 
    useEffect(() => {
        if (tasks.length) {
            return
        } else {
        dispatch({
            type: 'FETCH_TASKS'});
        }
    }, [dispatch]);

    function listByCategory(tasksArray) {
        let categoryArray = [];
        for (let obj of tasksArray) {
            if (category === obj.category) {
                categoryArray.push(obj);
            }
        }
        console.log('new array:', categoryArray);
        return categoryArray;
    }
    const tasksByCategory = listByCategory(tasks);
    console.log(tasksByCategory);

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
                {tasksByCategory.map(task => {
                    return (
                        <ul key={task.task_id}>
                            <li>Description: {task.task}
                                <div className="chip">Phase: {task.phase}</div>
                            </li>
                        </ul>
                    )
                })}
            </div>
        </div>
    )
}

export default CategoriesView;