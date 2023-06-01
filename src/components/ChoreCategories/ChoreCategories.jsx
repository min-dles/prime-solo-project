import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import './ChoreCategories.css';

function ChoreCategories() {

    // make a variable with the chore categories to be easily called/mapped:
    const categoriesArray = [
        'Household',
        'Cleaning',
        'Social',
        'Documents',
        'Health',
        'Shopping'
    ];

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    // listen for btn click & update state & dispatch to update global state in Redux store: 
    const chooseCategory = (categoryName) => {
        dispatch({
            type: 'SET_CATEGORY',
            payload: categoryName
        });
        if (location.pathname !== '/user/categories') {
            history.push('/user/categories');
        }
    }

    return (
        <div className="container chore-categories">

            <h3>Chore Categories:</h3>
            {categoriesArray.map(category => {
                return (
                    <button
                        key={category}
                        onClick={() => chooseCategory(category)}
                        className="btn-styling">
                        {category}
                    </button>
                )
            })}
        </div>
    )
}

export default ChoreCategories;