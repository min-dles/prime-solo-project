import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

    // listen for btn click & update state & dispatch to update global state in Redux store: 
    const chooseCategory = (categoryName) => {
        dispatch({
            type: 'SET_CATEGORY',
            payload: categoryName
        })
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