import React from 'react';
import './ChoreCategories.css';

function ChoreCategories() {

    return (
        <div className="container chore-categories">

            <h3>Chore Categories:</h3>

            <button className="btn-styling">Household</button>
            <button className="btn-styling">Cleaning</button>
            <button className="btn-styling">Social</button>
            <button className="btn-styling">Documents</button>
            <button className="btn-styling">Health</button>
            <button className="btn-styling">Shopping</button>

        </div>
    )
}

export default ChoreCategories;